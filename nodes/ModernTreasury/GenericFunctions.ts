/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import * as crypto from 'crypto';

/**
 * Make an API request to Modern Treasury
 */
export async function modernTreasuryApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('modernTreasuryApi');

	const options: IRequestOptions = {
		method,
		uri: `https://app.moderntreasury.com/api${endpoint}`,
		auth: {
			username: credentials.organizationId as string,
			password: credentials.apiKey as string,
		},
		headers: {
			'Content-Type': 'application/json',
		},
		qs: query,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: parseErrorMessage(error),
		});
	}
}

/**
 * Make an API request with pagination support
 */
export async function modernTreasuryApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let afterCursor: string | undefined;

	query.per_page = 100;

	do {
		if (afterCursor) {
			query.after_cursor = afterCursor;
		}

		const response = (await modernTreasuryApiRequest.call(
			this,
			method,
			endpoint,
			body,
			query,
		)) as IDataObject;

		const items = (response.items || response) as IDataObject[];
		if (Array.isArray(items)) {
			returnData.push(...items);
		} else if (Array.isArray(response)) {
			returnData.push(...response);
		}

		afterCursor = response.after_cursor as string | undefined;
	} while (afterCursor);

	return returnData;
}

/**
 * Parse error message from Modern Treasury API response
 */
function parseErrorMessage(error: unknown): string {
	const err = error as {
		response?: {
			body?: {
				errors?: Array<{ field?: string; message?: string }>;
				error?: string;
				message?: string;
			};
		};
		message?: string;
	};

	if (err.response?.body?.errors && Array.isArray(err.response.body.errors)) {
		return err.response.body.errors
			.map((e) => `${e.field ? `${e.field}: ` : ''}${e.message}`)
			.join(', ');
	}

	if (err.response?.body?.error) {
		return err.response.body.error;
	}

	if (err.response?.body?.message) {
		return err.response.body.message;
	}

	if (err.message) {
		return err.message;
	}

	return 'An unknown error occurred';
}

/**
 * Validate webhook signature using HMAC-SHA256
 */
export function validateWebhookSignature(
	payload: string,
	signature: string,
	secret: string,
): boolean {
	const expectedSignature = crypto
		.createHmac('sha256', secret)
		.update(payload)
		.digest('hex');
	
	try {
		return crypto.timingSafeEqual(
			Buffer.from(signature),
			Buffer.from(expectedSignature),
		);
	} catch {
		return false;
	}
}

/**
 * Clean object by removing undefined and empty string values
 */
export function cleanObject(obj: IDataObject): IDataObject {
	const cleaned: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== '' && value !== null) {
			if (typeof value === 'object' && !Array.isArray(value)) {
				const cleanedNested = cleanObject(value as IDataObject);
				if (Object.keys(cleanedNested).length > 0) {
					cleaned[key] = cleanedNested;
				}
			} else {
				cleaned[key] = value;
			}
		}
	}
	return cleaned;
}

/**
 * Convert camelCase to snake_case
 */
export function toSnakeCase(str: string): string {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convert object keys from camelCase to snake_case
 */
export function keysToSnakeCase(obj: IDataObject): IDataObject {
	const result: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		const snakeKey = toSnakeCase(key);
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			result[snakeKey] = keysToSnakeCase(value as IDataObject);
		} else {
			result[snakeKey] = value;
		}
	}
	return result;
}
