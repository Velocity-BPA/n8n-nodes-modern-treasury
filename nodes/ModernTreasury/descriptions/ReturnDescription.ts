/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const returnOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['return'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new return',
				action: 'Create a return',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a return by ID',
				action: 'Get a return',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many returns',
				action: 'Get many returns',
			},
		],
		default: 'getAll',
	},
];

export const returnFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Returnable ID',
		name: 'returnableId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['return'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the object being returned (payment order or incoming payment detail)',
	},
	{
		displayName: 'Returnable Type',
		name: 'returnableType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['return'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Incoming Payment Detail', value: 'incoming_payment_detail' },
			{ name: 'Payment Order', value: 'payment_order' },
		],
		default: 'payment_order',
		description: 'Type of object being returned',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['return'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Additional Information',
				name: 'additionalInformation',
				type: 'string',
				default: '',
				description: 'Additional information about the return',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'options',
				options: [
					{ name: 'R01 - Insufficient Funds', value: 'R01' },
					{ name: 'R02 - Account Closed', value: 'R02' },
					{ name: 'R03 - No Account/Unable to Locate', value: 'R03' },
					{ name: 'R04 - Invalid Account Number', value: 'R04' },
					{ name: 'R05 - Unauthorized Debit', value: 'R05' },
					{ name: 'R06 - Returned per ODFI Request', value: 'R06' },
					{ name: 'R07 - Authorization Revoked', value: 'R07' },
					{ name: 'R08 - Payment Stopped', value: 'R08' },
					{ name: 'R09 - Uncollected Funds', value: 'R09' },
					{ name: 'R10 - Customer Advises Not Authorized', value: 'R10' },
					{ name: 'R11 - Check Truncation Entry Return', value: 'R11' },
					{ name: 'R12 - Branch Sold to Another DFI', value: 'R12' },
					{ name: 'R13 - Invalid ACH Routing Number', value: 'R13' },
					{ name: 'R14 - Representative Payee Deceased', value: 'R14' },
					{ name: 'R15 - Beneficiary Deceased', value: 'R15' },
					{ name: 'R16 - Account Frozen', value: 'R16' },
					{ name: 'R17 - File Record Edit Criteria', value: 'R17' },
					{ name: 'R20 - Non-Transaction Account', value: 'R20' },
					{ name: 'R21 - Invalid Company ID', value: 'R21' },
					{ name: 'R22 - Invalid Individual ID', value: 'R22' },
					{ name: 'R23 - Credit Entry Refused by Receiver', value: 'R23' },
					{ name: 'R24 - Duplicate Entry', value: 'R24' },
					{ name: 'R29 - Corporate Customer Advises Not Authorized', value: 'R29' },
				],
				default: 'R01',
				description: 'Return reason code',
			},
			{
				displayName: 'Date Of Death',
				name: 'dateOfDeath',
				type: 'string',
				default: '',
				description: 'Date of death for deceased account holder (YYYY-MM-DD)',
			},
			{
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Reason for the return',
			},
		],
	},

	// Get fields
	{
		displayName: 'Return ID',
		name: 'returnId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['return'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the return',
	},

	// Get All fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['return'],
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
				resource: ['return'],
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
				resource: ['return'],
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
				displayName: 'Returnable ID',
				name: 'returnableId',
				type: 'string',
				default: '',
				description: 'Filter by returnable ID',
			},
			{
				displayName: 'Returnable Type',
				name: 'returnableType',
				type: 'options',
				options: [
					{ name: 'Incoming Payment Detail', value: 'incoming_payment_detail' },
					{ name: 'Payment Order', value: 'payment_order' },
				],
				default: 'payment_order',
				description: 'Filter by returnable type',
			},
		],
	},
];
