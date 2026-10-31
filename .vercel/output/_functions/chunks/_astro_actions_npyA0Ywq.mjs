import { At as ActionCalledFromServerError, Ct as fetchStateSymbol, fn as AstroError } from "./sequence_DKkBVb9G.mjs";
import { C as createActionsProxy, i as getAction, w as createGetActionPath } from "./server_BzCNdUHw.mjs";
createGetActionPath({
	baseUrl: "/",
	shouldAppendTrailingSlash: true
});
var actions = createActionsProxy({ handleAction: async (param, path, context) => {
	const state = context ? Reflect.get(context, fetchStateSymbol) : void 0;
	if (!state) throw new AstroError(ActionCalledFromServerError);
	const action = await getAction(state.manifest, path);
	if (!action) throw new Error(`Action not found: ${path}`);
	return action.bind(context)(param);
} });
export { actions as t };
