/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { cleanObject, validateWebhookSignature } from '../nodes/ModernTreasury/GenericFunctions';

describe('ModernTreasury GenericFunctions', () => {
	describe('cleanObject', () => {
		it('should remove undefined values', () => {
			const input = { a: 1, b: undefined, c: 'test' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, c: 'test' });
		});

		it('should remove empty strings', () => {
			const input = { a: 1, b: '', c: 'test' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, c: 'test' });
		});

		it('should remove null values', () => {
			const input = { a: 1, b: null, c: 'test' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, c: 'test' });
		});

		it('should handle nested objects', () => {
			const input = { a: 1, nested: { b: 2, c: undefined } };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, nested: { b: 2 } });
		});

		it('should remove empty nested objects', () => {
			const input = { a: 1, nested: { b: undefined } };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1 });
		});

		it('should preserve arrays', () => {
			const input = { a: 1, b: [1, 2, 3] };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, b: [1, 2, 3] });
		});

		it('should preserve boolean false', () => {
			const input = { a: 1, b: false };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, b: false });
		});

		it('should preserve zero', () => {
			const input = { a: 1, b: 0 };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 1, b: 0 });
		});
	});

	describe('validateWebhookSignature', () => {
		const secret = 'test-secret';

		it('should return true for valid signature', () => {
			const crypto = require('crypto');
			const payload = '{"event":"payment_order.created"}';
			const expectedSignature = crypto
				.createHmac('sha256', secret)
				.update(payload)
				.digest('hex');
			
			const result = validateWebhookSignature(payload, expectedSignature, secret);
			expect(result).toBe(true);
		});

		it('should return false for invalid signature', () => {
			const payload = '{"event":"payment_order.created"}';
			const invalidSignature = 'invalid-signature-value-here-abc123';
			
			const result = validateWebhookSignature(payload, invalidSignature, secret);
			expect(result).toBe(false);
		});

		it('should return false for empty signature', () => {
			const payload = '{"event":"payment_order.created"}';
			
			const result = validateWebhookSignature(payload, '', secret);
			expect(result).toBe(false);
		});
	});
});

describe('ModernTreasury Node Structure', () => {
	it('should have valid description exports', () => {
		const descriptions = require('../nodes/ModernTreasury/descriptions');
		
		expect(descriptions.paymentOrderOperations).toBeDefined();
		expect(descriptions.paymentOrderFields).toBeDefined();
		expect(descriptions.counterpartyOperations).toBeDefined();
		expect(descriptions.counterpartyFields).toBeDefined();
		expect(descriptions.externalAccountOperations).toBeDefined();
		expect(descriptions.externalAccountFields).toBeDefined();
		expect(descriptions.internalAccountOperations).toBeDefined();
		expect(descriptions.internalAccountFields).toBeDefined();
		expect(descriptions.transactionOperations).toBeDefined();
		expect(descriptions.transactionFields).toBeDefined();
		expect(descriptions.expectedPaymentOperations).toBeDefined();
		expect(descriptions.expectedPaymentFields).toBeDefined();
		expect(descriptions.returnOperations).toBeDefined();
		expect(descriptions.returnFields).toBeDefined();
		expect(descriptions.virtualAccountOperations).toBeDefined();
		expect(descriptions.virtualAccountFields).toBeDefined();
		expect(descriptions.routingNumberOperations).toBeDefined();
		expect(descriptions.routingNumberFields).toBeDefined();
	});

	it('should have paymentOrderOperations with correct operations', () => {
		const { paymentOrderOperations } = require('../nodes/ModernTreasury/descriptions');
		
		const operations = paymentOrderOperations[0].options;
		const operationValues = operations.map((op: { value: string }) => op.value);
		
		expect(operationValues).toContain('create');
		expect(operationValues).toContain('get');
		expect(operationValues).toContain('getAll');
		expect(operationValues).toContain('update');
	});

	it('should have counterpartyOperations with all operations', () => {
		const { counterpartyOperations } = require('../nodes/ModernTreasury/descriptions');
		
		const operations = counterpartyOperations[0].options;
		const operationValues = operations.map((op: { value: string }) => op.value);
		
		expect(operationValues).toContain('create');
		expect(operationValues).toContain('get');
		expect(operationValues).toContain('getAll');
		expect(operationValues).toContain('update');
		expect(operationValues).toContain('delete');
		expect(operationValues).toContain('collectAccount');
	});
});
