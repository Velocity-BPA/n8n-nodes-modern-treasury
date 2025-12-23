/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { modernTreasuryApiRequest, validateWebhookSignature } from './GenericFunctions';

// Runtime licensing notice - logged once per node load
const LICENSING_NOTICE_LOGGED = Symbol.for('modernTreasuryTrigger.licensingNoticeLogged');
if (!(globalThis as Record<symbol, boolean>)[LICENSING_NOTICE_LOGGED]) {
	console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
	(globalThis as Record<symbol, boolean>)[LICENSING_NOTICE_LOGGED] = true;
}

export class ModernTreasuryTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Modern Treasury Trigger',
		name: 'modernTreasuryTrigger',
		icon: 'file:moderntreasury.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when Modern Treasury events occur',
		defaults: {
			name: 'Modern Treasury Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'modernTreasuryApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
				description: 'The webhook secret from Modern Treasury for signature verification',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Expected Payment Created',
						value: 'expected_payment.created',
					},
					{
						name: 'Expected Payment Reconciled',
						value: 'expected_payment.reconciled',
					},
					{
						name: 'External Account Created',
						value: 'external_account.created',
					},
					{
						name: 'External Account Verification Updated',
						value: 'external_account.verification_updated',
					},
					{
						name: 'Payment Order Completed',
						value: 'payment_order.completed',
					},
					{
						name: 'Payment Order Created',
						value: 'payment_order.created',
					},
					{
						name: 'Payment Order Failed',
						value: 'payment_order.failed',
					},
					{
						name: 'Payment Order Updated',
						value: 'payment_order.updated',
					},
					{
						name: 'Return Created',
						value: 'return.created',
					},
					{
						name: 'Return Updated',
						value: 'return.updated',
					},
					{
						name: 'Transaction Created',
						value: 'transaction.created',
					},
					{
						name: 'Transaction Updated',
						value: 'transaction.updated',
					},
				],
				description: 'The events to listen for',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return false;
				}

				try {
					await modernTreasuryApiRequest.call(
						this,
						'GET',
						`/webhooks/${webhookData.webhookId}`,
					);
					return true;
				} catch (error) {
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events') as string[];
				const webhookData = this.getWorkflowStaticData('node');

				const body: IDataObject = {
					url: webhookUrl,
					enabled_events: events,
				};

				const response = await modernTreasuryApiRequest.call(
					this,
					'POST',
					'/webhooks',
					body,
				) as IDataObject;

				if (response.id) {
					webhookData.webhookId = response.id;
					return true;
				}

				return false;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await modernTreasuryApiRequest.call(
							this,
							'DELETE',
							`/webhooks/${webhookData.webhookId}`,
						);
					} catch (error) {
						return false;
					}
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const webhookSecret = this.getNodeParameter('webhookSecret') as string;
		const events = this.getNodeParameter('events') as string[];

		// Verify webhook signature
		const signature = req.headers['x-signature'] as string;
		if (signature && webhookSecret) {
			const rawBody = JSON.stringify(body);
			const isValid = validateWebhookSignature(rawBody, signature, webhookSecret);
			if (!isValid) {
				return {
					webhookResponse: { status: 401, body: 'Invalid signature' },
				};
			}
		}

		// Check if event type matches
		const eventType = body.event as string;
		if (events.length > 0 && !events.includes(eventType)) {
			return {
				webhookResponse: { status: 200, body: 'Event ignored' },
			};
		}

		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}
