/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const routingNumberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['routingNumber'],
			},
		},
		options: [
			{
				name: 'Validate',
				value: 'validate',
				description: 'Validate a routing number',
				action: 'Validate a routing number',
			},
		],
		default: 'validate',
	},
];

export const routingNumberFields: INodeProperties[] = [
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['routingNumber'],
				operation: ['validate'],
			},
		},
		default: '',
		description: 'The routing number to validate',
	},
	{
		displayName: 'Routing Number Type',
		name: 'routingNumberType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['routingNumber'],
				operation: ['validate'],
			},
		},
		options: [
			{ name: 'ABA', value: 'aba' },
			{ name: 'AU BSB', value: 'au_bsb' },
			{ name: 'BR Codigo', value: 'br_codigo' },
			{ name: 'CA CPA', value: 'ca_cpa' },
			{ name: 'CHIPS', value: 'chips' },
			{ name: 'CNAPS', value: 'cnaps' },
			{ name: 'GB Sort Code', value: 'gb_sort_code' },
			{ name: 'IN IFSC', value: 'in_ifsc' },
			{ name: 'JP Zengin Code', value: 'jp_zengin_code' },
			{ name: 'NZ National Clearing Code', value: 'nz_national_clearing_code' },
			{ name: 'SE Bankgiro Clearing Code', value: 'se_bankgiro_clearing_code' },
			{ name: 'SWIFT', value: 'swift' },
		],
		default: 'aba',
		description: 'The type of routing number to validate',
	},
];
