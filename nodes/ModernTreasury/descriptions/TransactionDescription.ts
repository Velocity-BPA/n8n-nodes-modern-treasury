/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a transaction by ID',
				action: 'Get a transaction',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many transactions',
				action: 'Get many transactions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a transaction',
				action: 'Update a transaction',
			},
		],
		default: 'getAll',
	},
];

export const transactionFields: INodeProperties[] = [
	// Get/Update fields
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'The ID of the transaction',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['transaction'],
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
				resource: ['transaction'],
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
				resource: ['transaction'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'As Of Date From',
				name: 'asOfDateStart',
				type: 'string',
				default: '',
				description: 'Filter by as-of date start (YYYY-MM-DD)',
			},
			{
				displayName: 'As Of Date To',
				name: 'asOfDateEnd',
				type: 'string',
				default: '',
				description: 'Filter by as-of date end (YYYY-MM-DD)',
			},
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
				description: 'Filter by transaction direction',
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
				displayName: 'Payment Type',
				name: 'paymentType',
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
			{
				displayName: 'Posted',
				name: 'posted',
				type: 'boolean',
				default: true,
				description: 'Filter by posted status',
			},
			{
				displayName: 'Virtual Account ID',
				name: 'virtualAccountId',
				type: 'string',
				default: '',
				description: 'Filter by virtual account ID',
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
				resource: ['transaction'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
		],
	},
];
