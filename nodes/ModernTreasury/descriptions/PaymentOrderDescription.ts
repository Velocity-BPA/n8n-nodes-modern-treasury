/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const paymentOrderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new payment order',
				action: 'Create a payment order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment order by ID',
				action: 'Get a payment order',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many payment orders',
				action: 'Get many payment orders',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a payment order',
				action: 'Update a payment order',
			},
		],
		default: 'create',
	},
];

export const paymentOrderFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'ACH', value: 'ach' },
			{ name: 'AU BECS', value: 'au_becs' },
			{ name: 'BACS', value: 'bacs' },
			{ name: 'Book', value: 'book' },
			{ name: 'Card', value: 'card' },
			{ name: 'CHATS', value: 'chats' },
			{ name: 'Check', value: 'check' },
			{ name: 'Cross Border', value: 'cross_border' },
			{ name: 'DK Nets', value: 'dk_nets' },
			{ name: 'EFT', value: 'eft' },
			{ name: 'Interac', value: 'interac' },
			{ name: 'NEFT', value: 'neft' },
			{ name: 'NZ BECS', value: 'nz_becs' },
			{ name: 'Provxchange', value: 'provxchange' },
			{ name: 'RTP', value: 'rtp' },
			{ name: 'SEPA', value: 'sepa' },
			{ name: 'SG GIRO', value: 'sg_giro' },
			{ name: 'SIC', value: 'sic' },
			{ name: 'Signet', value: 'signet' },
			{ name: 'Wire', value: 'wire' },
			{ name: 'Zengin', value: 'zengin' },
		],
		default: 'ach',
		description: 'The type of payment order',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Value in specified currency\'s smallest unit (e.g., cents for USD)',
	},
	{
		displayName: 'Direction',
		name: 'direction',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Credit', value: 'credit', description: 'Send money to the receiving account' },
			{ name: 'Debit', value: 'debit', description: 'Pull money from the receiving account' },
		],
		default: 'credit',
		description: 'Direction of the payment',
	},
	{
		displayName: 'Originating Account ID',
		name: 'originatingAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of your internal account that will send/receive funds',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Charge Bearer',
				name: 'chargeBearer',
				type: 'options',
				options: [
					{ name: 'Shared', value: 'shared' },
					{ name: 'Sender', value: 'sender' },
					{ name: 'Receiver', value: 'receiver' },
				],
				default: 'shared',
				description: 'Who bears the cost of the transfer fees',
			},
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the counterparty',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'An optional description for internal use',
			},
			{
				displayName: 'Effective Date',
				name: 'effectiveDate',
				type: 'string',
				default: '',
				description: 'Date the payment should be executed (YYYY-MM-DD)',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'string',
				default: '',
				description: 'RTP payments only - expiration time (ISO 8601)',
			},
			{
				displayName: 'Fallback Type',
				name: 'fallbackType',
				type: 'options',
				options: [
					{ name: 'ACH', value: 'ach' },
					{ name: 'None', value: '' },
				],
				default: '',
				description: 'Fallback payment type if primary fails',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Normal', value: 'normal' },
				],
				default: 'normal',
				description: 'Payment priority',
			},
			{
				displayName: 'Purpose',
				name: 'purpose',
				type: 'string',
				default: '',
				description: 'Payment purpose for compliance',
			},
			{
				displayName: 'Receiving Account ID',
				name: 'receivingAccountId',
				type: 'string',
				default: '',
				description: 'The ID of the external account receiving the payment',
			},
			{
				displayName: 'Remittance Information',
				name: 'remittanceInformation',
				type: 'string',
				default: '',
				description: 'Remittance information for the payment',
			},
			{
				displayName: 'Send Remittance Advice',
				name: 'sendRemittanceAdvice',
				type: 'boolean',
				default: false,
				description: 'Whether to send remittance advice to counterparty',
			},
			{
				displayName: 'Statement Descriptor',
				name: 'statementDescriptor',
				type: 'string',
				default: '',
				description: 'Text that appears on bank statement',
			},
			{
				displayName: 'Subtype',
				name: 'subtype',
				type: 'options',
				options: [
					{ name: 'None', value: '' },
					{ name: 'CCD', value: 'ccd' },
					{ name: 'CIE', value: 'cie' },
					{ name: 'CTX', value: 'ctx' },
					{ name: 'IAT', value: 'iat' },
					{ name: 'PPD', value: 'ppd' },
					{ name: 'TEL', value: 'tel' },
					{ name: 'WEB', value: 'web' },
				],
				default: '',
				description: 'Payment subtype for ACH',
			},
		],
	},

	// Get fields
	{
		displayName: 'Payment Order ID',
		name: 'paymentOrderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the payment order to retrieve',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'Filter by counterparty ID',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{ name: 'Credit', value: 'credit' },
					{ name: 'Debit', value: 'debit' },
				],
				default: 'credit',
				description: 'Filter by payment direction',
			},
			{
				displayName: 'Originating Account ID',
				name: 'originatingAccountId',
				type: 'string',
				default: '',
				description: 'Filter by originating account ID',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'High', value: 'high' },
					{ name: 'Normal', value: 'normal' },
				],
				default: 'normal',
				description: 'Filter by priority',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'approved' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Denied', value: 'denied' },
					{ name: 'Failed', value: 'failed' },
					{ name: 'Needs Approval', value: 'needs_approval' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Processing', value: 'processing' },
					{ name: 'Returned', value: 'returned' },
					{ name: 'Reversed', value: 'reversed' },
					{ name: 'Sent', value: 'sent' },
				],
				default: 'pending',
				description: 'Filter by status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'ACH', value: 'ach' },
					{ name: 'Book', value: 'book' },
					{ name: 'Check', value: 'check' },
					{ name: 'EFT', value: 'eft' },
					{ name: 'RTP', value: 'rtp' },
					{ name: 'SEPA', value: 'sepa' },
					{ name: 'Wire', value: 'wire' },
				],
				default: 'ach',
				description: 'Filter by payment type',
			},
		],
	},

	// Update fields
	{
		displayName: 'Payment Order ID',
		name: 'paymentOrderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the payment order to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['paymentOrder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'An optional description',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Approved', value: 'approved' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Denied', value: 'denied' },
				],
				default: 'approved',
				description: 'Update the status of the payment order',
			},
		],
	},
];
