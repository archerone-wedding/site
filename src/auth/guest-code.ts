import { randomInt } from 'node:crypto';

const GUEST_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const GUEST_CODE_LENGTH = 8;

export function generateGuestCode(): string {
	let code = '';
	for (let i = 0; i < GUEST_CODE_LENGTH; i++) {
		code += GUEST_CODE_ALPHABET[randomInt(GUEST_CODE_ALPHABET.length)];
	}
	return code;
}
