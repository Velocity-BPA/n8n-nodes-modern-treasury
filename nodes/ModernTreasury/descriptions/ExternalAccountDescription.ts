/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const externalAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new external account',
				action: 'Create an external account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an external account',
				action: 'Delete an external account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an external account by ID',
				action: 'Get an external account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many external accounts',
				action: 'Get many external accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an external account',
				action: 'Update an external account',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify an external account with micro-deposits',
				action: 'Verify an external account',
			},
		],
		default: 'create',
	},
];

export const externalAccountFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Counterparty ID',
		name: 'counterpartyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the counterparty this account belongs to',
	},
	{
		displayName: 'Account Type',
		name: 'accountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Cash', value: 'cash' },
			{ name: 'Checking', value: 'checking' },
			{ name: 'General Ledger', value: 'general_ledger' },
			{ name: 'Loan', value: 'loan' },
			{ name: 'Non-Resident', value: 'non_resident' },
			{ name: 'Other', value: 'other' },
			{ name: 'Overdraft', value: 'overdraft' },
			{ name: 'Savings', value: 'savings' },
		],
		default: 'checking',
		description: 'Type of external account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Details',
				name: 'accountDetails',
				type: 'json',
				default: '[]',
				description: 'Array of account detail objects with account_number and account_number_type',
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
				description: 'A nickname for the account',
			},
			{
				displayName: 'Party Address',
				name: 'partyAddress',
				type: 'json',
				default: '{}',
				description: 'Address of the account holder as JSON (line1, line2, locality, region, postal_code, country)',
			},
			{
				displayName: 'Party Name',
				name: 'partyName',
				type: 'string',
				default: '',
				description: 'Name of the account holder',
			},
			{
				displayName: 'Party Type',
				name: 'partyType',
				type: 'options',
				options: [
					{ name: 'Business', value: 'business' },
					{ name: 'Individual', value: 'individual' },
				],
				default: 'individual',
				description: 'Type of party',
			},
			{
				displayName: 'Plaid Processor Token',
				name: 'plaidProcessorToken',
				type: 'string',
				default: '',
				description: 'Plaid processor token for instant account verification',
			},
			{
				displayName: 'Routing Details',
				name: 'routingDetails',
				type: 'json',
				default: '[]',
				description: 'Array of routing detail objects with routing_number and routing_number_type',
			},
		],
	},

	// Get/Delete/Update/Verify fields
	{
		displayName: 'External Account ID',
		name: 'externalAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['get', 'delete', 'update', 'verify'],
			},
		},
		default: '',
		description: 'The ID of the external account',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
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
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Filter by metadata key-value pairs',
			},
			{
				displayName: 'Party Name',
				name: 'partyName',
				type: 'string',
				default: '',
				description: 'Filter by party name',
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
				resource: ['externalAccount'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'Cash', value: 'cash' },
					{ name: 'Checking', value: 'checking' },
					{ name: 'General Ledger', value: 'general_ledger' },
					{ name: 'Loan', value: 'loan' },
					{ name: 'Non-Resident', value: 'non_resident' },
					{ name: 'Other', value: 'other' },
					{ name: 'Overdraft', value: 'overdraft' },
					{ name: 'Savings', value: 'savings' },
				],
				default: 'checking',
				description: 'Type of external account',
			},
			{
				displayName: 'Counterparty ID',
				name: 'counterpartyId',
				type: 'string',
				default: '',
				description: 'The ID of the counterparty',
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
				description: 'A nickname for the account',
			},
			{
				displayName: 'Party Name',
				name: 'partyName',
				type: 'string',
				default: '',
				description: 'Name of the account holder',
			},
			{
				displayName: 'Party Type',
				name: 'partyType',
				type: 'options',
				options: [
					{ name: 'Business', value: 'business' },
					{ name: 'Individual', value: 'individual' },
				],
				default: 'individual',
				description: 'Type of party',
			},
		],
	},

	// Verify fields
	{
		displayName: 'Verification Amounts',
		name: 'verificationAmounts',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['verify'],
			},
		},
		default: '[10, 35]',
		description: 'Array of two micro-deposit amounts in cents [amount1, amount2]',
	},
];
