import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateGuestCode } from './guest-code';

test('generates eight-character guest codes from the existing alphabet', () => {
	const alphabet = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/;
	const codes = Array.from({ length: 100 }, generateGuestCode);
	for (const code of codes) assert.match(code, alphabet);
});
