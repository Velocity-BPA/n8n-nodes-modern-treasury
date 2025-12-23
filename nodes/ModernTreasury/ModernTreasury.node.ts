/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import {
	modernTreasuryApiRequest,
	modernTreasuryApiRequestAllItems,
	cleanObject,
} from './GenericFunctions';

import {
	paymentOrderOperations,
	paymentOrderFields,
	counterpartyOperations,
	counterpartyFields,
	externalAccountOperations,
	externalAccountFields,
	internalAccountOperations,
	internalAccountFields,
	transactionOperations,
	transactionFields,
	expectedPaymentOperations,
	expectedPaymentFields,
	returnOperations,
	returnFields,
	virtualAccountOperations,
	virtualAccountFields,
	routingNumberOperations,
	routingNumberFields,
} from './descriptions';

// Runtime licensing notice - logged once per node load
const LICENSING_NOTICE_LOGGED = Symbol.for('modernTreasury.licensingNoticeLogged');
if (!(globalThis as Record<symbol, boolean>)[LICENSING_NOTICE_LOGGED]) {
	console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);
	(globalThis as Record<symbol, boolean>)[LICENSING_NOTICE_LOGGED] = true;
}

export class ModernTreasury implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Modern Treasury',
		name: 'modernTreasury',
		icon: 'file:moderntreasury.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Modern Treasury API for payment operations',
		defaults: {
			name: 'Modern Treasury',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'modernTreasuryApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Counterparty', value: 'counterparty' },
					{ name: 'Expected Payment', value: 'expectedPayment' },
					{ name: 'External Account', value: 'externalAccount' },
					{ name: 'Internal Account', value: 'internalAccount' },
					{ name: 'Payment Order', value: 'paymentOrder' },
					{ name: 'Return', value: 'return' },
					{ name: 'Routing Number', value: 'routingNumber' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Virtual Account', value: 'virtualAccount' },
				],
				default: 'paymentOrder',
			},
			...paymentOrderOperations,
			...paymentOrderFields,
			...counterpartyOperations,
			...counterpartyFields,
			...externalAccountOperations,
			...externalAccountFields,
			...internalAccountOperations,
			...internalAccountFields,
			...transactionOperations,
			...transactionFields,
			...expectedPaymentOperations,
			...expectedPaymentFields,
			...returnOperations,
			...returnFields,
			...virtualAccountOperations,
			...virtualAccountFields,
			...routingNumberOperations,
			...routingNumberFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Payment Order
				if (resource === 'paymentOrder') {
					if (operation === 'create') {
						const body: IDataObject = {
							type: this.getNodeParameter('type', i),
							amount: this.getNodeParameter('amount', i),
							direction: this.getNodeParameter('direction', i),
							originating_account_id: this.getNodeParameter('originatingAccountId', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.chargeBearer) body.charge_bearer = additionalFields.chargeBearer;
						if (additionalFields.counterpartyId) body.counterparty_id = additionalFields.counterpartyId;
						if (additionalFields.currency) body.currency = additionalFields.currency;
						if (additionalFields.description) body.description = additionalFields.description;
						if (additionalFields.effectiveDate) body.effective_date = additionalFields.effectiveDate;
						if (additionalFields.expiresAt) body.expires_at = additionalFields.expiresAt;
						if (additionalFields.fallbackType) body.fallback_type = additionalFields.fallbackType;
						if (additionalFields.metadata) body.metadata = JSON.parse(additionalFields.metadata as string);
						if (additionalFields.priority) body.priority = additionalFields.priority;
						if (additionalFields.purpose) body.purpose = additionalFields.purpose;
						if (additionalFields.receivingAccountId) body.receiving_account_id = additionalFields.receivingAccountId;
						if (additionalFields.remittanceInformation) body.remittance_information = additionalFields.remittanceInformation;
						if (additionalFields.sendRemittanceAdvice !== undefined) body.send_remittance_advice = additionalFields.sendRemittanceAdvice;
						if (additionalFields.statementDescriptor) body.statement_descriptor = additionalFields.statementDescriptor;
						if (additionalFields.subtype) body.subtype = additionalFields.subtype;
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/payment_orders', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('paymentOrderId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/payment_orders/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.direction) query.direction = filters.direction;
						if (filters.originatingAccountId) query.originating_account_id = filters.originatingAccountId;
						if (filters.priority) query.priority = filters.priority;
						if (filters.status) query.status = filters.status;
						if (filters.type) query.type = filters.type;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/payment_orders', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/payment_orders', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('paymentOrderId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.description) body.description = updateFields.description;
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						if (updateFields.status) body.status = updateFields.status;
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/payment_orders/${id}`, cleanObject(body));
					}
				}

				// Counterparty
				else if (resource === 'counterparty') {
					if (operation === 'create') {
						const body: IDataObject = { name: this.getNodeParameter('name', i) };
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.accounts) body.accounts = JSON.parse(additionalFields.accounts as string);
						if (additionalFields.email) body.email = additionalFields.email;
						if (additionalFields.ledgerType) body.ledger_type = additionalFields.ledgerType;
						if (additionalFields.metadata) body.metadata = JSON.parse(additionalFields.metadata as string);
						if (additionalFields.sendRemittanceAdvice !== undefined) body.send_remittance_advice = additionalFields.sendRemittanceAdvice;
						if (additionalFields.taxpayerIdentifier) body.taxpayer_identifier = additionalFields.taxpayerIdentifier;
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/counterparties', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('counterpartyId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/counterparties/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.email) query.email = filters.email;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (filters.name) query.name = filters.name;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/counterparties', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/counterparties', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('counterpartyId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.email) body.email = updateFields.email;
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.sendRemittanceAdvice !== undefined) body.send_remittance_advice = updateFields.sendRemittanceAdvice;
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/counterparties/${id}`, cleanObject(body));
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('counterpartyId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'DELETE', `/counterparties/${id}`);
					} else if (operation === 'collectAccount') {
						const id = this.getNodeParameter('counterpartyId', i) as string;
						const options = this.getNodeParameter('collectAccountOptions', i) as IDataObject;
						const body: IDataObject = {};
						if (options.customRedirect) body.custom_redirect = options.customRedirect;
						if (options.direction) body.direction = options.direction;
						if (options.fields) body.fields = options.fields;
						if (options.sendEmail !== undefined) body.send_email = options.sendEmail;
						responseData = await modernTreasuryApiRequest.call(this, 'POST', `/counterparties/${id}/collect_account`, cleanObject(body));
					}
				}

				// External Account
				else if (resource === 'externalAccount') {
					if (operation === 'create') {
						const body: IDataObject = {
							counterparty_id: this.getNodeParameter('counterpartyId', i),
							account_type: this.getNodeParameter('accountType', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.accountDetails) body.account_details = JSON.parse(additionalFields.accountDetails as string);
						if (additionalFields.metadata) body.metadata = JSON.parse(additionalFields.metadata as string);
						if (additionalFields.name) body.name = additionalFields.name;
						if (additionalFields.partyAddress) body.party_address = JSON.parse(additionalFields.partyAddress as string);
						if (additionalFields.partyName) body.party_name = additionalFields.partyName;
						if (additionalFields.partyType) body.party_type = additionalFields.partyType;
						if (additionalFields.plaidProcessorToken) body.plaid_processor_token = additionalFields.plaidProcessorToken;
						if (additionalFields.routingDetails) body.routing_details = JSON.parse(additionalFields.routingDetails as string);
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/external_accounts', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('externalAccountId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/external_accounts/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (filters.partyName) query.party_name = filters.partyName;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/external_accounts', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/external_accounts', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('externalAccountId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.accountType) body.account_type = updateFields.accountType;
						if (updateFields.counterpartyId) body.counterparty_id = updateFields.counterpartyId;
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.partyName) body.party_name = updateFields.partyName;
						if (updateFields.partyType) body.party_type = updateFields.partyType;
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/external_accounts/${id}`, cleanObject(body));
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('externalAccountId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'DELETE', `/external_accounts/${id}`);
					} else if (operation === 'verify') {
						const id = this.getNodeParameter('externalAccountId', i) as string;
						const amounts = JSON.parse(this.getNodeParameter('verificationAmounts', i) as string);
						responseData = await modernTreasuryApiRequest.call(this, 'POST', `/external_accounts/${id}/verify`, { amounts });
					}
				}

				// Internal Account
				else if (resource === 'internalAccount') {
					if (operation === 'get') {
						const id = this.getNodeParameter('internalAccountId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/internal_accounts/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.currency) query.currency = filters.currency;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (filters.paymentDirection) query.payment_direction = filters.paymentDirection;
						if (filters.paymentType) query.payment_type = filters.paymentType;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/internal_accounts', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/internal_accounts', {}, query);
						}
					}
				}

				// Transaction
				else if (resource === 'transaction') {
					if (operation === 'get') {
						const id = this.getNodeParameter('transactionId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/transactions/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.asOfDateStart) query.as_of_date_start = filters.asOfDateStart;
						if (filters.asOfDateEnd) query.as_of_date_end = filters.asOfDateEnd;
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.direction) query.direction = filters.direction;
						if (filters.internalAccountId) query.internal_account_id = filters.internalAccountId;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (filters.paymentType) query.payment_type = filters.paymentType;
						if (filters.posted !== undefined) query.posted = filters.posted;
						if (filters.virtualAccountId) query.virtual_account_id = filters.virtualAccountId;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/transactions', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/transactions', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('transactionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/transactions/${id}`, cleanObject(body));
					}
				}

				// Expected Payment
				else if (resource === 'expectedPayment') {
					if (operation === 'create') {
						const body: IDataObject = {
							internal_account_id: this.getNodeParameter('internalAccountId', i),
							direction: this.getNodeParameter('direction', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.amountLowerBound) body.amount_lower_bound = additionalFields.amountLowerBound;
						if (additionalFields.amountUpperBound) body.amount_upper_bound = additionalFields.amountUpperBound;
						if (additionalFields.counterpartyId) body.counterparty_id = additionalFields.counterpartyId;
						if (additionalFields.currency) body.currency = additionalFields.currency;
						if (additionalFields.dateLowerBound) body.date_lower_bound = additionalFields.dateLowerBound;
						if (additionalFields.dateUpperBound) body.date_upper_bound = additionalFields.dateUpperBound;
						if (additionalFields.description) body.description = additionalFields.description;
						if (additionalFields.metadata) body.metadata = JSON.parse(additionalFields.metadata as string);
						if (additionalFields.remittanceInformation) body.remittance_information = additionalFields.remittanceInformation;
						if (additionalFields.statementDescriptor) body.statement_descriptor = additionalFields.statementDescriptor;
						if (additionalFields.type) body.type = additionalFields.type;
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/expected_payments', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('expectedPaymentId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/expected_payments/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.direction) query.direction = filters.direction;
						if (filters.internalAccountId) query.internal_account_id = filters.internalAccountId;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (filters.status) query.status = filters.status;
						if (filters.type) query.type = filters.type;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/expected_payments', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/expected_payments', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('expectedPaymentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.amountLowerBound) body.amount_lower_bound = updateFields.amountLowerBound;
						if (updateFields.amountUpperBound) body.amount_upper_bound = updateFields.amountUpperBound;
						if (updateFields.counterpartyId) body.counterparty_id = updateFields.counterpartyId;
						if (updateFields.description) body.description = updateFields.description;
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						if (updateFields.remittanceInformation) body.remittance_information = updateFields.remittanceInformation;
						if (updateFields.status) body.status = updateFields.status;
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/expected_payments/${id}`, cleanObject(body));
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('expectedPaymentId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'DELETE', `/expected_payments/${id}`);
					}
				}

				// Return
				else if (resource === 'return') {
					if (operation === 'create') {
						const body: IDataObject = {
							returnable_id: this.getNodeParameter('returnableId', i),
							returnable_type: this.getNodeParameter('returnableType', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.additionalInformation) body.additional_information = additionalFields.additionalInformation;
						if (additionalFields.code) body.code = additionalFields.code;
						if (additionalFields.dateOfDeath) body.date_of_death = additionalFields.dateOfDeath;
						if (additionalFields.reason) body.reason = additionalFields.reason;
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/returns', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('returnId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/returns/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.internalAccountId) query.internal_account_id = filters.internalAccountId;
						if (filters.returnableId) query.returnable_id = filters.returnableId;
						if (filters.returnableType) query.returnable_type = filters.returnableType;
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/returns', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/returns', {}, query);
						}
					}
				}

				// Virtual Account
				else if (resource === 'virtualAccount') {
					if (operation === 'create') {
						const body: IDataObject = {
							internal_account_id: this.getNodeParameter('internalAccountId', i),
							name: this.getNodeParameter('name', i),
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.accountDetails) body.account_details = JSON.parse(additionalFields.accountDetails as string);
						if (additionalFields.counterpartyId) body.counterparty_id = additionalFields.counterpartyId;
						if (additionalFields.creditLedgerAccountId) body.credit_ledger_account_id = additionalFields.creditLedgerAccountId;
						if (additionalFields.debitLedgerAccountId) body.debit_ledger_account_id = additionalFields.debitLedgerAccountId;
						if (additionalFields.description) body.description = additionalFields.description;
						if (additionalFields.metadata) body.metadata = JSON.parse(additionalFields.metadata as string);
						if (additionalFields.routingDetails) body.routing_details = JSON.parse(additionalFields.routingDetails as string);
						responseData = await modernTreasuryApiRequest.call(this, 'POST', '/virtual_accounts', cleanObject(body));
					} else if (operation === 'get') {
						const id = this.getNodeParameter('virtualAccountId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', `/virtual_accounts/${id}`);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query: IDataObject = {};
						if (filters.counterpartyId) query.counterparty_id = filters.counterpartyId;
						if (filters.internalAccountId) query.internal_account_id = filters.internalAccountId;
						if (filters.metadata) query.metadata = JSON.parse(filters.metadata as string);
						if (returnAll) {
							responseData = await modernTreasuryApiRequestAllItems.call(this, 'GET', '/virtual_accounts', {}, query);
						} else {
							query.per_page = this.getNodeParameter('limit', i);
							responseData = await modernTreasuryApiRequest.call(this, 'GET', '/virtual_accounts', {}, query);
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('virtualAccountId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = {};
						if (updateFields.counterpartyId) body.counterparty_id = updateFields.counterpartyId;
						if (updateFields.ledgerAccountId) body.ledger_account_id = updateFields.ledgerAccountId;
						if (updateFields.metadata) body.metadata = JSON.parse(updateFields.metadata as string);
						if (updateFields.name) body.name = updateFields.name;
						responseData = await modernTreasuryApiRequest.call(this, 'PATCH', `/virtual_accounts/${id}`, cleanObject(body));
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('virtualAccountId', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'DELETE', `/virtual_accounts/${id}`);
					}
				}

				// Routing Number
				else if (resource === 'routingNumber') {
					if (operation === 'validate') {
						const routingNumber = this.getNodeParameter('routingNumber', i) as string;
						const routingNumberType = this.getNodeParameter('routingNumberType', i) as string;
						responseData = await modernTreasuryApiRequest.call(this, 'GET', '/validations/routing_number', {}, {
							routing_number: routingNumber,
							routing_number_type: routingNumberType,
						});
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
