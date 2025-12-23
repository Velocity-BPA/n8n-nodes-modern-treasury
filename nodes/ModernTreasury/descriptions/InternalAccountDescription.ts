/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const internalAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['internalAccount'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an internal account by ID',
				action: 'Get an internal account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many internal accounts',
				action: 'Get many internal accounts',
			},
		],
		default: 'getAll',
	},
];

export const internalAccountFields: INodeProperties[] = [
	// Get fields
	{
		displayName: 'Internal Account ID',
		name: 'internalAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['internalAccount'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the internal account',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['internalAccount'],
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
				resource: ['internalAccount'],
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
				resource: ['internalAccount'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Filter by currency code (e.g., USD)',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Filter by metadata key-value pairs',
			},
			{
				displayName: 'Payment Direction',
				name: 'paymentDirection',
				type: 'options',
				options: [
					{ name: 'Credit', value: 'credit' },
					{ name: 'Debit', value: 'debit' },
				],
				default: 'credit',
				description: 'Filter by payment direction capability',
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
				description: 'Filter by payment type capability',
			},
		],
	},
];
