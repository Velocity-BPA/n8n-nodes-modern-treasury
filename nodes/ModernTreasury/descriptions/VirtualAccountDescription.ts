/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const virtualAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new virtual account',
				action: 'Create a virtual account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a virtual account',
				action: 'Delete a virtual account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a virtual account by ID',
				action: 'Get a virtual account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many virtual accounts',
				action: 'Get many virtual accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a virtual account',
				action: 'Update a virtual account',
			},
		],
		default: 'create',
	},
];

export const virtualAccountFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Internal Account ID',
		name: 'internalAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the internal account that this virtual account belongs to',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A name for the virtual account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Details',
				name: 'accountDetails',
				type: 'json',
				default: '[]',
				description: 'Array of account detail objects',
			},
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the counterparty',
			},
			{
				displayName: 'Credit Ledger Account ID',
				name: 'creditLedgerAccountId',
				type: 'string',
				default: '',
				description: 'Ledger account ID for credits',
			},
			{
				displayName: 'Debit Ledger Account ID',
				name: 'debitLedgerAccountId',
				type: 'string',
				default: '',
				description: 'Ledger account ID for debits',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the virtual account',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Routing Details',
				name: 'routingDetails',
				type: 'json',
				default: '[]',
				description: 'Array of routing detail objects',
			},
		],
	},

	// Get/Delete/Update fields
	{
		displayName: 'Virtual Account ID',
		name: 'virtualAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the virtual account',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
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
				resource: ['virtualAccount'],
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
				resource: ['virtualAccount'],
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
				resource: ['virtualAccount'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the counterparty',
			},
			{
				displayName: 'Ledger Account ID',
				name: 'ledgerAccountId',
				type: 'string',
				default: '',
				description: 'Ledger account ID',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'A name for the virtual account',
			},
		],
	},
];
