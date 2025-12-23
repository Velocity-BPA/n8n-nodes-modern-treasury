/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const counterpartyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['counterparty'],
			},
		},
		options: [
			{
				name: 'Collect Account Details',
				value: 'collectAccount',
				description: 'Send an email to collect account details',
				action: 'Collect account details from a counterparty',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new counterparty',
				action: 'Create a counterparty',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a counterparty',
				action: 'Delete a counterparty',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a counterparty by ID',
				action: 'Get a counterparty',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many counterparties',
				action: 'Get many counterparties',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a counterparty',
				action: 'Update a counterparty',
			},
		],
		default: 'create',
	},
];

export const counterpartyFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['counterparty'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'A human-friendly name for the counterparty',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['counterparty'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Accounts',
				name: 'accounts',
				type: 'json',
				default: '[]',
				description: 'Array of account objects with account_type, routing_number, account_number',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the counterparty',
			},
			{
				displayName: 'Ledger Type',
				name: 'ledgerType',
				type: 'options',
				options: [
					{ name: 'Customer', value: 'customer' },
					{ name: 'Vendor', value: 'vendor' },
				],
				default: 'customer',
				description: 'Type of counterparty for ledger purposes',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON object',
			},
			{
				displayName: 'Send Remittance Advice',
				name: 'sendRemittanceAdvice',
				type: 'boolean',
				default: false,
				description: 'Whether to send remittance advice emails',
			},
			{
				displayName: 'Taxpayer Identifier',
				name: 'taxpayerIdentifier',
				type: 'string',
				default: '',
				description: 'Tax ID of the counterparty (EIN, SSN, etc.)',
			},
		],
	},

	// Get/Delete/Update/CollectAccount fields
	{
		displayName: 'Counterparty ID',
		name: 'counterpartyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['counterparty'],
				operation: ['get', 'delete', 'update', 'collectAccount'],
			},
		},
		default: '',
		description: 'The ID of the counterparty',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['counterparty'],
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
				resource: ['counterparty'],
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
				resource: ['counterparty'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Filter by metadata key-value pairs',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by counterparty name',
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
				resource: ['counterparty'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the counterparty',
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
				description: 'A human-friendly name for the counterparty',
			},
			{
				displayName: 'Send Remittance Advice',
				name: 'sendRemittanceAdvice',
				type: 'boolean',
				default: false,
				description: 'Whether to send remittance advice emails',
			},
		],
	},

	// Collect Account fields
	{
		displayName: 'Collect Account Options',
		name: 'collectAccountOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['counterparty'],
				operation: ['collectAccount'],
			},
		},
		options: [
			{
				displayName: 'Custom Redirect',
				name: 'customRedirect',
				type: 'string',
				default: '',
				description: 'Custom redirect URL after account collection',
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
				description: 'Direction of future payments',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'multiOptions',
				options: [
					{ name: 'Address', value: 'address' },
					{ name: 'Email', value: 'email' },
					{ name: 'Name', value: 'name' },
					{ name: 'Phone Number', value: 'phone_number' },
				],
				default: [],
				description: 'Additional fields to collect',
			},
			{
				displayName: 'Send Email',
				name: 'sendEmail',
				type: 'boolean',
				default: true,
				description: 'Whether to send an email invitation',
			},
		],
	},
];
