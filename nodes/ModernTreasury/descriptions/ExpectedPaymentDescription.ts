/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const expectedPaymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new expected payment',
				action: 'Create an expected payment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an expected payment',
				action: 'Delete an expected payment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an expected payment by ID',
				action: 'Get an expected payment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many expected payments',
				action: 'Get many expected payments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an expected payment',
				action: 'Update an expected payment',
			},
		],
		default: 'create',
	},
];

export const expectedPaymentFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Internal Account ID',
		name: 'internalAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the internal account you expect to receive the payment',
	},
	{
		displayName: 'Direction',
		name: 'direction',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Credit', value: 'credit', description: 'Incoming payment' },
			{ name: 'Debit', value: 'debit', description: 'Outgoing payment' },
		],
		default: 'credit',
		description: 'Direction of the expected payment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Amount Lower Bound (Cents)',
				name: 'amountLowerBound',
				type: 'number',
				default: 0,
				description: 'Minimum expected amount in cents',
			},
			{
				displayName: 'Amount Upper Bound (Cents)',
				name: 'amountUpperBound',
				type: 'number',
				default: 0,
				description: 'Maximum expected amount in cents',
			},
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the expected counterparty',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Date Lower Bound',
				name: 'dateLowerBound',
				type: 'string',
				default: '',
				description: 'Earliest expected date (YYYY-MM-DD)',
			},
			{
				displayName: 'Date Upper Bound',
				name: 'dateUpperBound',
				type: 'string',
				default: '',
				description: 'Latest expected date (YYYY-MM-DD)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the expected payment',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Remittance Information',
				name: 'remittanceInformation',
				type: 'string',
				default: '',
				description: 'Remittance information to match against',
			},
			{
				displayName: 'Statement Descriptor',
				name: 'statementDescriptor',
				type: 'string',
				default: '',
				description: 'Statement descriptor to match against',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'ACH', value: 'ach' },
					{ name: 'AU BECS', value: 'au_becs' },
					{ name: 'BACS', value: 'bacs' },
					{ name: 'Book', value: 'book' },
					{ name: 'Card', value: 'card' },
					{ name: 'Check', value: 'check' },
					{ name: 'Cross Border', value: 'cross_border' },
					{ name: 'EFT', value: 'eft' },
					{ name: 'Interac', value: 'interac' },
					{ name: 'NEFT', value: 'neft' },
					{ name: 'Provxchange', value: 'provxchange' },
					{ name: 'RTP', value: 'rtp' },
					{ name: 'SEPA', value: 'sepa' },
					{ name: 'Signet', value: 'signet' },
					{ name: 'Wire', value: 'wire' },
				],
				default: 'ach',
				description: 'Expected payment type',
			},
		],
	},

	// Get/Delete/Update fields
	{
		displayName: 'Expected Payment ID',
		name: 'expectedPaymentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the expected payment',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
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
				resource: ['expectedPayment'],
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
				resource: ['expectedPayment'],
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
				description: 'Filter by direction',
			},
			{
				displayName: 'Internal Account ID',
				name: 'internalAccountId',
				type: 'string',
				default: '',
				description: 'Filter by internal account ID',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Filter by metadata key-value pairs',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Archived', value: 'archived' },
					{ name: 'Partially Reconciled', value: 'partially_reconciled' },
					{ name: 'Reconciled', value: 'reconciled' },
					{ name: 'Unreconciled', value: 'unreconciled' },
				],
				default: 'unreconciled',
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
				description: 'Filter by type',
			},
		],
	},

	// Update fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['expectedPayment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount Lower Bound (Cents)',
				name: 'amountLowerBound',
				type: 'number',
				default: 0,
				description: 'Minimum expected amount in cents',
			},
			{
				displayName: 'Amount Upper Bound (Cents)',
				name: 'amountUpperBound',
				type: 'number',
				default: 0,
				description: 'Maximum expected amount in cents',
			},
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the expected counterparty',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the expected payment',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Remittance Information',
				name: 'remittanceInformation',
				type: 'string',
				default: '',
				description: 'Remittance information to match against',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Archived', value: 'archived' },
					{ name: 'Reconciled', value: 'reconciled' },
				],
				default: 'reconciled',
				description: 'Update status',
			},
		],
	},
];
