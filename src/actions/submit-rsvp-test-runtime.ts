import { registerHooks } from 'node:module';
import { z } from 'astro/zod';
export { z };

export let db: unknown;

export function configureTestDb(testDb: unknown) {
	db = testDb;
}

export function defineAction<T>(definition: T): T {
	return definition;
}

export class ActionError extends Error {
	code: string;
	constructor({ code, message }: { code: string; message: string }) {
		super(message);
		this.code = code;
	}
}

const testRuntimeUrl = new URL('./submit-rsvp-test-runtime.ts', import.meta.url).href;

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier === 'astro:actions' || specifier === 'astro:schema') {
			return { url: testRuntimeUrl, shortCircuit: true };
		}
		if (specifier === '../db/client' && context.parentURL?.endsWith('/src/actions/index.ts')) {
			return { url: testRuntimeUrl, shortCircuit: true };
		}
		return nextResolve(specifier, context);
	},
});
