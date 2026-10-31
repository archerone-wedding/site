import { $ as getErrorRoutePath, A as renderSlotToString, At as ActionCalledFromServerError, Ct as fetchStateSymbol, Dt as defineMiddleware, Et as shouldAppendForwardSlash, Ft as ClientAddressNotAvailable, H as renderEndpoint, Ht as ForbiddenRewrite, J as getDefaultStatusCode, K as getCustom404Route, L as isRenderInstruction, Mt as ActionsReturnedInvalidDataError, Nt as AstroResponseHeadersReassigned, O as chunkToString, Ot as decodeKey, Pt as CacheNotEnabled, Q as isRoute500, R as normalizeCspResourceEntry, T as renderJSX, Tt as responseSentSymbol$1, U as createAsyncManifestMemo, W as createManifestMemo, Xt as MiddlewareNoDataOrNextCalled, Y as routeHasHtmlExtension, Yt as LocalsReassigned, Z as isRoute404, Zt as MiddlewareNotAResponse, _ as DEFAULT_404_ROUTE, _t as ASTRO_ERROR_HEADER, an as ReservedSlotName, b as readBodyWithLimit, bt as REROUTABLE_STATUS_CODES, c as getOriginPathname, d as validateAndDecodePathname, dn as i18nNoLocaleFoundInPath, dt as prependForwardSlash, et as normalizeTheLocale, f as getLogger, fn as AstroError, g as astroToRuntimeLogger, gt as stripRequestBase, ht as removeTrailingForwardSlash, i as getRouteCache, it as collapseDuplicateSlashes, j as isRenderTemplateResult, jt as ActionNotFoundError, kt as generateCspDigest, l as setOriginPathname, n as getParams, nn as NoManifestAvailable, nt as pathHasLocale, o as getEnvironment, on as ResponseSentError, pn as isAstroError, pt as removeLeadingForwardSlash, q as getCustom500Route, r as getProps, rn as PrerenderClientAddressNotAvailable, rt as appendForwardSlash, s as copyRequest, sn as StaticClientAddressNotAvailable, t as sequence, tt as normalizeThePath, u as MultiLevelEncodingError, ut as joinPaths, v as SERVER_ISLAND_COMPONENT, vt as ASTRO_GENERATOR, w as renderPage, wt as originPathnameSymbol, xt as STATUS_CODE_PAGES, y as BodySizeLimitError, yt as REDIRECT_STATUS_CODES, z as pushDirective } from "./sequence_DKkBVb9G.mjs";
import { n as matchPattern } from "./remote_Z-Z8LuKO.mjs";
import { parse, stringify } from "devalue";
import * as z from "zod/v4/core";
import colors from "piccolore";
import { parseCookie, stringifySetCookie } from "cookie";
// node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
// node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
		...serializedRoute,
		routeData: deserializeRouteData(serializedRoute.routeData)
	});
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
// \0virtual:astro:renderers
var renderers = [];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/astro/dist/assets/endpoint/generic.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_actions/[...path]",
			"pattern": "^\\/_actions(?:\\/(.*?))?\\/?$",
			"segments": [[{
				"content": "_actions",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...path",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...path"],
			"component": "node_modules/astro/dist/actions/runtime/entrypoints/route.js",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin.astro",
			"pathname": "/admin",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/contact",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/contact\\/?$",
			"segments": [[{
				"content": "contact",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/contact.astro",
			"pathname": "/contact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/gate",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/gate\\/?$",
			"segments": [[{
				"content": "gate",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/gate.astro",
			"pathname": "/gate",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/itineraire",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/itineraire\\/?$",
			"segments": [[{
				"content": "itineraire",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/itineraire.astro",
			"pathname": "/itineraire",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/le-mariage",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/le-mariage\\/?$",
			"segments": [[{
				"content": "le-mariage",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/le-mariage.astro",
			"pathname": "/le-mariage",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/legad",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/legad\\/?$",
			"segments": [[{
				"content": "legad",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/legad.astro",
			"pathname": "/legad",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/liste-mariage",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/liste-mariage\\/?$",
			"segments": [[{
				"content": "liste-mariage",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/liste-mariage.astro",
			"pathname": "/liste-mariage",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/logement",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/logement\\/?$",
			"segments": [[{
				"content": "logement",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/logement.astro",
			"pathname": "/logement",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/logout",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/logout\\/?$",
			"segments": [[{
				"content": "logout",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/logout.astro",
			"pathname": "/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/preparatifs",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/preparatifs\\/?$",
			"segments": [[{
				"content": "preparatifs",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/preparatifs.astro",
			"pathname": "/preparatifs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/rsvp",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/rsvp\\/?$",
			"segments": [[{
				"content": "rsvp",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/rsvp.astro",
			"pathname": "/rsvp",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
// \0virtual:astro:pages
var _page0 = () => import("./generic_WTOGplav.mjs").then((n) => n.t);
var _page1 = () => import("./route_BWKZfcpy.mjs");
var _page2 = () => import("./admin_BR97peTP.mjs");
var _page3 = () => import("./contact_WRpr3kdg.mjs");
var _page4 = () => import("./gate_CBQMrK5K.mjs");
var _page5 = () => import("./itineraire_CODxDgJD.mjs");
var _page6 = () => import("./le-mariage_Dm9DzoPz.mjs");
var _page7 = () => import("./legad_MmXgy7dZ.mjs");
var _page8 = () => import("./liste-mariage_DmVNhovo.mjs");
var _page9 = () => import("./logement_BURORTrr.mjs");
var _page10 = () => import("./logout_2eJRm3mV.mjs");
var _page11 = () => import("./preparatifs_xHRsZXs4.mjs");
var _page12 = () => import("./rsvp_C0oARIvi.mjs");
var _page13 = () => import("./index_D5H0fM3a.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
	["node_modules/astro/dist/actions/runtime/entrypoints/route.js", _page1],
	["src/pages/admin.astro", _page2],
	["src/pages/contact.astro", _page3],
	["src/pages/gate.astro", _page4],
	["src/pages/itineraire.astro", _page5],
	["src/pages/le-mariage.astro", _page6],
	["src/pages/legad.astro", _page7],
	["src/pages/liste-mariage.astro", _page8],
	["src/pages/logement.astro", _page9],
	["src/pages/logout.astro", _page10],
	["src/pages/preparatifs.astro", _page11],
	["src/pages/rsvp.astro", _page12],
	["src/pages/index.astro", _page13]
]);
// \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/","cacheDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/node_modules/.astro/","outDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/dist/","srcDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/src/","publicDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/public/","buildClientDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/dist/client/","buildServerDir":"file:///C:/Users/Charles%20Labelle/OneDrive/Documents/Mariage/dist/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?\\/?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/astro/dist/actions/runtime/entrypoints/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import \"https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Raleway:wght@300;400;500;600&display=swap\";:root{--color-cream:#fdfcfa;--color-ink:#2f2a26;--color-teal:#47666f;--color-teal-dark:#3a565e;--color-muted:#7c756e;--font-display:\"Cormorant\", serif;--font-sans-elegant:\"Raleway\", sans-serif}[data-astro-cid-hfbr3nnz]{box-sizing:border-box}body{background:var(--color-cream);min-height:100dvh;color:var(--color-ink);font-family:var(--font-sans-elegant);margin:0;max-width:800px;margin-inline:auto;padding:2rem 1.5rem;line-height:1.5}h1[data-astro-cid-hfbr3nnz]{font-family:var(--font-display);margin:0 0 1.5rem;font-size:2rem;font-style:italic;font-weight:400}label[data-astro-cid-hfbr3nnz]{color:var(--color-muted);margin-bottom:.25rem;font-size:.85rem;display:block}input[data-astro-cid-hfbr3nnz],textarea[data-astro-cid-hfbr3nnz],select[data-astro-cid-hfbr3nnz]{background:#fff;border:1px solid #2f2a2633;border-radius:.35rem;width:100%;margin-bottom:1rem;padding:.6rem .8rem;font-family:inherit;font-size:1rem}button[data-astro-cid-hfbr3nnz]{background:var(--color-teal);color:#fff;cursor:pointer;border:none;border-radius:.35rem;padding:.6rem 1.2rem;font-family:inherit;font-size:1rem}button[data-astro-cid-hfbr3nnz]:hover{background:var(--color-teal-dark)}.error[data-astro-cid-hfbr3nnz]{color:#c0392b;margin-top:-.5rem;margin-bottom:1rem;font-size:.9rem}table[data-astro-cid-hfbr3nnz]{border-collapse:collapse;width:100%;margin-top:2rem;font-size:.9rem}th[data-astro-cid-hfbr3nnz],td[data-astro-cid-hfbr3nnz]{text-align:left;border-bottom:1px solid #2f2a261a;padding:.6rem .5rem}th[data-astro-cid-hfbr3nnz]{color:var(--color-muted);font-weight:500}code[data-astro-cid-hfbr3nnz]{background:#2f2a260f;border-radius:.25rem;padding:.15rem .4rem;font-size:.85rem}.logout[data-astro-cid-hfbr3nnz]{color:var(--color-teal);cursor:pointer;background:0 0;border:none;padding:0;font-size:.9rem;text-decoration:underline}.gate[data-astro-cid-hfbr3nnz]{text-align:center;max-width:360px;margin:8rem auto}.gate[data-astro-cid-hfbr3nnz] input[data-astro-cid-hfbr3nnz]{margin-bottom:.75rem}\n"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":".page[data-astro-cid-6bfsojfh]{max-width:960px;font-family:var(--font-sans-elegant);margin:0 auto;padding:3rem 1.5rem 4rem}h1[data-astro-cid-6bfsojfh]{font-family:var(--font-display);color:var(--color-navy-text);letter-spacing:.02em;margin:0 0 .75rem;font-size:clamp(1.8rem,4vw,2.4rem);font-style:italic;font-weight:500}.page-header[data-astro-cid-6bfsojfh]{vertical-align:top;display:inline-block}.page-header[data-astro-cid-6bfsojfh] h1[data-astro-cid-6bfsojfh]{margin-bottom:.75rem}.section-separator[data-astro-cid-6bfsojfh]{background:var(--color-navy-text);opacity:.35;width:100%;height:1px;margin:0 0 2.5rem}.contact-name[data-astro-cid-6bfsojfh]{color:var(--color-brown);margin:0 0 .5rem;font-size:1.15rem;font-weight:500}.contact-address[data-astro-cid-6bfsojfh]{color:var(--color-brown);font-size:1.05rem;font-style:normal;line-height:1.65}@media (width<=720px){.page[data-astro-cid-6bfsojfh]{padding:2rem 1.25rem 3rem}}.reveal[data-astro-cid-6bfsojfh]{opacity:0;transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);transform:translateY(25px)}.reveal[data-astro-cid-6bfsojfh].is-visible{opacity:1;transform:translateY(0)}.section-separator[data-astro-cid-6bfsojfh].reveal-line{transform-origin:50%;transition:transform .8s cubic-bezier(.25,.46,.45,.94) .15s;transform:scaleX(0)}.section-separator[data-astro-cid-6bfsojfh].reveal-line.is-visible{transform:scaleX(1)}\nheader[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gate","isIndex":false,"type":"page","pattern":"^\\/gate\\/?$","segments":[[{"content":"gate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gate.astro","pathname":"/gate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/VenueMap.3iqvZXYP.css"},{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n.page[data-astro-cid-syswux6h]{max-width:960px;font-family:var(--font-sans-elegant);margin:0 auto;padding:3rem 1.5rem 4rem}h1[data-astro-cid-syswux6h]{font-family:var(--font-display);color:var(--color-navy-text);letter-spacing:.02em;margin:0 0 .75rem;font-size:clamp(1.8rem,4vw,2.4rem);font-style:italic;font-weight:500}.page-header[data-astro-cid-syswux6h]{vertical-align:top;display:inline-block}.page-header[data-astro-cid-syswux6h] h1[data-astro-cid-syswux6h]{margin-bottom:.75rem}.section-separator[data-astro-cid-syswux6h]{background:var(--color-navy-text);opacity:.35;width:100%;height:1px;margin:0 0 2.5rem}.venue[data-astro-cid-syswux6h]{margin-bottom:2rem}.venue__name[data-astro-cid-syswux6h]{margin:0 0 .25rem;font-weight:600}.venue__address[data-astro-cid-syswux6h]{color:var(--color-muted);margin:0 0 .25rem;font-style:normal}.venue__parking[data-astro-cid-syswux6h]{color:var(--color-muted);margin:0 0 1.25rem;font-style:normal}.venue__links[data-astro-cid-syswux6h]{flex-wrap:wrap;gap:.5rem 1.5rem;margin:0;padding:0;list-style:none;display:flex}.venue__links[data-astro-cid-syswux6h] a[data-astro-cid-syswux6h]{color:var(--color-teal)}.church[data-astro-cid-syswux6h]{margin-bottom:2rem}.church__name[data-astro-cid-syswux6h]{margin:0 0 .25rem;font-weight:600}.church__address[data-astro-cid-syswux6h]{color:var(--color-muted);margin:0 0 1.25rem;font-style:normal}.church__links[data-astro-cid-syswux6h]{flex-wrap:wrap;gap:.5rem 1.5rem;margin:0;padding:0;list-style:none;display:flex}.church__links[data-astro-cid-syswux6h] a[data-astro-cid-syswux6h]{color:var(--color-teal)}@media (width<=720px){.page[data-astro-cid-syswux6h]{padding:2rem 1.25rem 3rem}}.reveal[data-astro-cid-syswux6h]{opacity:0;transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);transform:translateY(25px)}.reveal[data-astro-cid-syswux6h].is-visible{opacity:1;transform:translateY(0)}.section-separator[data-astro-cid-syswux6h].reveal-line{transform-origin:50%;transition:transform .8s cubic-bezier(.25,.46,.45,.94) .15s;transform:scaleX(0)}.section-separator[data-astro-cid-syswux6h].reveal-line.is-visible{transform:scaleX(1)}\n"}],"routeData":{"route":"/itineraire","isIndex":false,"type":"page","pattern":"^\\/itineraire\\/?$","segments":[[{"content":"itineraire","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/itineraire.astro","pathname":"/itineraire","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"external","src":"_astro/le-mariage.DNFWoJTJ.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"}],"routeData":{"route":"/le-mariage","isIndex":false,"type":"page","pattern":"^\\/le-mariage\\/?$","segments":[[{"content":"le-mariage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/le-mariage.astro","pathname":"/le-mariage","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".page[data-astro-cid-n57aacfu]{max-width:960px;font-family:var(--font-sans-elegant);margin:0 auto;padding:3rem 1.5rem 4rem}h1[data-astro-cid-n57aacfu]{font-family:var(--font-display);color:var(--color-navy-text);letter-spacing:.02em;margin:0 0 .75rem;font-size:clamp(1.8rem,4vw,2.4rem);font-style:italic;font-weight:500}.page-header[data-astro-cid-n57aacfu]{vertical-align:top;display:inline-block}.page-header[data-astro-cid-n57aacfu] h1[data-astro-cid-n57aacfu]{margin-bottom:.75rem}.section-separator[data-astro-cid-n57aacfu]{background:var(--color-navy-text);opacity:.35;width:100%;height:1px;margin:0 0 2.5rem}p[data-astro-cid-n57aacfu]{color:var(--color-brown);font-size:1.05rem;line-height:1.65}@media (width<=720px){.page[data-astro-cid-n57aacfu]{padding:2rem 1.25rem 3rem}}.reveal[data-astro-cid-n57aacfu]{opacity:0;transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);transform:translateY(25px)}.reveal[data-astro-cid-n57aacfu].is-visible{opacity:1;transform:translateY(0)}.section-separator[data-astro-cid-n57aacfu].reveal-line{transform-origin:50%;transition:transform .8s cubic-bezier(.25,.46,.45,.94) .15s;transform:scaleX(0)}.section-separator[data-astro-cid-n57aacfu].reveal-line.is-visible{transform:scaleX(1)}\n"},{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"}],"routeData":{"route":"/legad","isIndex":false,"type":"page","pattern":"^\\/legad\\/?$","segments":[[{"content":"legad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/legad.astro","pathname":"/legad","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".page[data-astro-cid-alrczozz]{max-width:960px;font-family:var(--font-sans-elegant);margin:0 auto;padding:3rem 1.5rem 4rem}h1[data-astro-cid-alrczozz]{font-family:var(--font-display);color:var(--color-navy-text);letter-spacing:.02em;margin:0 0 .75rem;font-size:clamp(1.8rem,4vw,2.4rem);font-style:italic;font-weight:500}.page-header[data-astro-cid-alrczozz]{vertical-align:top;display:inline-block}.page-header[data-astro-cid-alrczozz] h1[data-astro-cid-alrczozz]{margin-bottom:.75rem}.section-separator[data-astro-cid-alrczozz]{background:var(--color-navy-text);opacity:.35;width:100%;height:1px;margin:0 0 2.5rem}.intro[data-astro-cid-alrczozz]{color:var(--color-brown);margin:0 0 1.25rem;font-size:1.05rem;line-height:1.65}@media (width<=720px){.page[data-astro-cid-alrczozz]{padding:2rem 1.25rem 3rem}}.reveal[data-astro-cid-alrczozz]{opacity:0;transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);transform:translateY(25px)}.reveal[data-astro-cid-alrczozz].is-visible{opacity:1;transform:translateY(0)}.section-separator[data-astro-cid-alrczozz].reveal-line{transform-origin:50%;transition:transform .8s cubic-bezier(.25,.46,.45,.94) .15s;transform:scaleX(0)}.section-separator[data-astro-cid-alrczozz].reveal-line.is-visible{transform:scaleX(1)}\n"},{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"}],"routeData":{"route":"/liste-mariage","isIndex":false,"type":"page","pattern":"^\\/liste-mariage\\/?$","segments":[[{"content":"liste-mariage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/liste-mariage.astro","pathname":"/liste-mariage","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".page[data-astro-cid-h6h77ywd]{max-width:960px;font-family:var(--font-sans-elegant);margin:0 auto;padding:3rem 1.5rem 4rem}h1[data-astro-cid-h6h77ywd]{font-family:var(--font-display);color:var(--color-navy-text);letter-spacing:.02em;margin:0 0 .75rem;font-size:clamp(1.8rem,4vw,2.4rem);font-style:italic;font-weight:500}.page-header[data-astro-cid-h6h77ywd]{vertical-align:top;display:inline-block}.page-header[data-astro-cid-h6h77ywd] h1[data-astro-cid-h6h77ywd]{margin-bottom:.75rem}.section-separator[data-astro-cid-h6h77ywd]{background:var(--color-navy-text);opacity:.35;width:100%;height:1px;margin:0 0 2.5rem}.intro[data-astro-cid-h6h77ywd]{color:var(--color-brown);margin:0 0 2rem;font-size:1.05rem;line-height:1.65}.intro[data-astro-cid-h6h77ywd] strong[data-astro-cid-h6h77ywd]{color:var(--color-navy-text);font-weight:600}.lodging-table[data-astro-cid-h6h77ywd]{width:100%;overflow-x:auto}table[data-astro-cid-h6h77ywd]{border-collapse:collapse;width:100%;font-size:.98rem}th[data-astro-cid-h6h77ywd],td[data-astro-cid-h6h77ywd]{text-align:left;border-bottom:1px solid rgba(var(--color-brown-rgb), .12);vertical-align:top;padding:1.1rem .75rem}th[data-astro-cid-h6h77ywd]{letter-spacing:.1em;text-transform:uppercase;color:var(--color-gold-accent);border-bottom-width:2px;font-size:.8rem;font-weight:500}th[data-astro-cid-h6h77ywd].num,td[data-astro-cid-h6h77ywd].num{text-align:center;width:7rem}td[data-astro-cid-h6h77ywd] a[data-astro-cid-h6h77ywd]{color:var(--color-brown);letter-spacing:.04em;text-transform:uppercase;font-size:.9rem;font-weight:500;text-decoration:none}td[data-astro-cid-h6h77ywd] a[data-astro-cid-h6h77ywd]:hover{color:var(--color-navy-text)}.arrow[data-astro-cid-h6h77ywd]{color:var(--color-gold-accent);opacity:.7;margin-left:.4rem;font-size:1rem}tr[data-astro-cid-h6h77ywd]:last-child td[data-astro-cid-h6h77ywd]{border-bottom:none}@media (width<=720px){.page[data-astro-cid-h6h77ywd]{padding:2rem 1.25rem 3rem}th[data-astro-cid-h6h77ywd],td[data-astro-cid-h6h77ywd]{padding:.85rem .5rem;font-size:.9rem}th[data-astro-cid-h6h77ywd]{font-size:.7rem}td[data-astro-cid-h6h77ywd] a[data-astro-cid-h6h77ywd]{font-size:.82rem}}.reveal[data-astro-cid-h6h77ywd]{opacity:0;transition:opacity .7s cubic-bezier(.25,.46,.45,.94),transform .7s cubic-bezier(.25,.46,.45,.94);transform:translateY(25px)}.reveal[data-astro-cid-h6h77ywd].is-visible{opacity:1;transform:translateY(0)}.section-separator[data-astro-cid-h6h77ywd].reveal-line{transform-origin:50%;transition:transform .8s cubic-bezier(.25,.46,.45,.94) .15s;transform:scaleX(0)}.section-separator[data-astro-cid-h6h77ywd].reveal-line.is-visible{transform:scaleX(1)}\n"},{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"}],"routeData":{"route":"/logement","isIndex":false,"type":"page","pattern":"^\\/logement\\/?$","segments":[[{"content":"logement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logement.astro","pathname":"/logement","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/logout","isIndex":false,"type":"page","pattern":"^\\/logout\\/?$","segments":[[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logout.astro","pathname":"/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/VenueMap.3iqvZXYP.css"},{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"},{"type":"external","src":"_astro/preparatifs.BhS0bGrL.css"}],"routeData":{"route":"/preparatifs","isIndex":false,"type":"page","pattern":"^\\/preparatifs\\/?$","segments":[[{"content":"preparatifs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preparatifs.astro","pathname":"/preparatifs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":"header[data-astro-cid-xa52sxzc]{z-index:100;background:var(--color-navy);position:sticky;top:0}\n"},{"type":"external","src":"_astro/rsvp.BvUeucLN.css"}],"routeData":{"route":"/rsvp","isIndex":false,"type":"page","pattern":"^\\/rsvp\\/?$","segments":[[{"content":"rsvp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rsvp.astro","pathname":"/rsvp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/SiteNav.k_h2y94C.css"},{"type":"inline","content":".landing-nav[data-astro-cid-lcdefpme]{z-index:100;background:0 0;transition:background .5s;position:fixed;top:0;left:0;right:0}.landing-nav[data-astro-cid-lcdefpme].is-scrolled,.landing-nav[data-astro-cid-lcdefpme]:hover{background:var(--color-navy)}.landing-nav[data-astro-cid-lcdefpme] .site-nav--inline{background:0 0;transition:background .5s}.landing-nav[data-astro-cid-lcdefpme].is-scrolled .site-nav--inline,.landing-nav[data-astro-cid-lcdefpme]:hover .site-nav--inline{background:var(--color-navy)}.landing-nav[data-astro-cid-lcdefpme]:before{content:\"\";background:var(--color-navy);opacity:0;z-index:-1;transition:opacity .6s;position:absolute;inset:0}.landing-nav[data-astro-cid-lcdefpme].is-scrolled:before,.landing-nav[data-astro-cid-lcdefpme]:hover:before{opacity:1}.hero[data-astro-cid-lcdefpme]{justify-content:center;align-items:flex-end;width:100%;height:100dvh;margin:0;padding:0 0 18vh;display:flex;position:relative;overflow:hidden}.hero-bg[data-astro-cid-lcdefpme]{background-image:url(/img/IMG-20261027.jpg);background-position:65%;background-size:cover;position:absolute;inset:0}.hero-overlay[data-astro-cid-lcdefpme]{z-index:1;background:#00000059;position:absolute;inset:0}.hero-panel[data-astro-cid-lcdefpme]{z-index:2;color:var(--color-white);text-align:center;flex-direction:column;justify-content:center;align-items:center;padding:2rem;display:flex;position:relative}.hero-panel[data-astro-cid-lcdefpme]>[data-astro-cid-lcdefpme]{z-index:1;position:relative}h1[data-astro-cid-lcdefpme]{font-family:var(--font-script);color:var(--color-white);letter-spacing:.02em;text-shadow:0 2px 12px #0006;margin:0 0 1.5rem;font-size:clamp(2.5rem,6vw,4.5rem);font-style:normal;font-weight:400;line-height:1.1}.amp[data-astro-cid-lcdefpme]{font-family:var(--font-script);color:var(--color-white);font-size:.85em;font-style:normal}.hero-separator[data-astro-cid-lcdefpme]{background:var(--color-white);opacity:.7;width:120px;height:1px;margin:0 0 1.5rem}.date[data-astro-cid-lcdefpme]{font-size:clamp(1.4rem,3.5vw,2.2rem);font-family:var(--font-display);font-variant:small-caps;letter-spacing:.04em;text-transform:none;color:var(--color-white);text-shadow:0 1px 8px #0006;margin:0;font-style:normal;font-weight:400}.reveal[data-astro-cid-lcdefpme]{opacity:0;transition:opacity .8s cubic-bezier(.25,.46,.45,.94),transform .8s cubic-bezier(.25,.46,.45,.94);transform:translateY(30px)}.reveal[data-astro-cid-lcdefpme].is-visible{opacity:1;transform:translateY(0)}.hero-separator[data-astro-cid-lcdefpme].reveal{transform-origin:50%;transition:opacity .6s,transform .8s cubic-bezier(.25,.46,.45,.94);transform:scaleX(0)}.hero-separator[data-astro-cid-lcdefpme].reveal.is-visible{transform:scaleX(1)}.reveal[data-astro-cid-lcdefpme][data-delay=\"1\"].is-visible{transition-delay:.12s}.reveal[data-astro-cid-lcdefpme][data-delay=\"2\"].is-visible{transition-delay:.24s}@media (width<=860px){.hero[data-astro-cid-lcdefpme]{padding-bottom:12vh}h1[data-astro-cid-lcdefpme]{margin-bottom:1.25rem}.hero-separator[data-astro-cid-lcdefpme]{width:80px}}@media (width<=420px){.hero[data-astro-cid-lcdefpme]{padding-bottom:10vh}.hero-panel[data-astro-cid-lcdefpme]{padding:1.5rem}.date[data-astro-cid-lcdefpme]{font-size:1rem}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/node_modules/astro/dist/actions/runtime/entrypoints/route.js",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/gate.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/rsvp.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/itineraire.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/le-mariage.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro",{"propagation":"none","containsHead":true}],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()},r=typeof t.value==`object`?t.value:void 0,i={timeout:r==null?void 0:r.timeout};`requestIdleCallback`in window?window.requestIdleCallback(n,i):setTimeout(n,i.timeout||200)};(self.Astro||(self.Astro={})).idle=e,window.dispatchEvent(new Event(`astro:idle`))})();"],["load","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).load=e,window.dispatchEvent(new Event(`astro:load`))})();"],["media","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()};if(t.value){let e=matchMedia(t.value);e.matches?n():e.addEventListener(`change`,n,{once:!0})}};(self.Astro||(self.Astro={})).media=e,window.dispatchEvent(new Event(`astro:media`))})();"],["only","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).only=e,window.dispatchEvent(new Event(`astro:only`))})();"],["visible","(function(){let e=(e,t,n)=>{let r=async()=>{await(await e())()},i=typeof t.value==`object`?t.value:void 0,a={rootMargin:i==null?void 0:i.rootMargin},o=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){o.disconnect(),r();break}},a);for(let e of n.children)o.observe(e)};(self.Astro||(self.Astro={})).visible=e,window.dispatchEvent(new Event(`astro:visible`))})();"]],"entryModules":{"\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_BhTW5IeR.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_BWWe3pKI.mjs","\u0000virtual:astro:actions/entrypoint":"chunks/entrypoint_BV4wO1Yv.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/admin@_@astro":"chunks/admin_BR97peTP.mjs","\u0000virtual:astro:page:src/pages/contact@_@astro":"chunks/contact_WRpr3kdg.mjs","\u0000virtual:astro:page:src/pages/gate@_@astro":"chunks/gate_CBQMrK5K.mjs","\u0000virtual:astro:page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_WTOGplav.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_D5H0fM3a.mjs","\u0000virtual:astro:page:src/pages/itineraire@_@astro":"chunks/itineraire_CODxDgJD.mjs","\u0000virtual:astro:page:src/pages/le-mariage@_@astro":"chunks/le-mariage_Dm9DzoPz.mjs","\u0000virtual:astro:page:src/pages/legad@_@astro":"chunks/legad_MmXgy7dZ.mjs","\u0000virtual:astro:page:src/pages/liste-mariage@_@astro":"chunks/liste-mariage_DmVNhovo.mjs","\u0000virtual:astro:page:src/pages/logement@_@astro":"chunks/logement_BURORTrr.mjs","\u0000virtual:astro:page:src/pages/logout@_@astro":"chunks/logout_2eJRm3mV.mjs","\u0000virtual:astro:page:src/pages/preparatifs@_@astro":"chunks/preparatifs_xHRsZXs4.mjs","\u0000virtual:astro:page:node_modules/astro/dist/actions/runtime/entrypoints/route@_@js":"chunks/route_BWKZfcpy.mjs","\u0000virtual:astro:page:src/pages/rsvp@_@astro":"chunks/rsvp_C0oARIvi.mjs","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DCKUggZI.mjs","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramA.astro?astro&type=script&index=0&lang.ts":"_astro/ProgramA.astro_astro_type_script_index_0_lang.CWPZin2V.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramB.astro?astro&type=script&index=0&lang.ts":"_astro/ProgramB.astro_astro_type_script_index_0_lang.CWPZin2V.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramC.astro?astro&type=script&index=0&lang.ts":"_astro/ProgramC.astro_astro_type_script_index_0_lang.CWPZin2V.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramD.astro?astro&type=script&index=0&lang.ts":"_astro/ProgramD.astro_astro_type_script_index_0_lang.CWPZin2V.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/SiteNav.astro?astro&type=script&index=0&lang.ts":"_astro/SiteNav.astro_astro_type_script_index_0_lang.BqHJwiD5.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/VenueMap.astro?astro&type=script&index=0&lang.ts":"_astro/VenueMap.astro_astro_type_script_index_0_lang.BUXlQG7-.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BstPjOgU.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/itineraire.astro?astro&type=script&index=0&lang.ts":"_astro/itineraire.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/le-mariage.astro?astro&type=script&index=0&lang.ts":"_astro/le-mariage.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro?astro&type=script&index=0&lang.ts":"_astro/legad.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro?astro&type=script&index=0&lang.ts":"_astro/liste-mariage.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro?astro&type=script&index=0&lang.ts":"_astro/logement.astro_astro_type_script_index_0_lang.CbhLHIGD.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro?astro&type=script&index=0&lang.ts":"_astro/preparatifs.astro_astro_type_script_index_0_lang.lC2WPP8i.js","C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/rsvp.astro?astro&type=script&index=0&lang.ts":"_astro/rsvp.astro_astro_type_script_index_0_lang.DGzp_Hom.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramA.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.rope-line, .day-title, .step`).forEach(t=>e.observe(t)),document.querySelectorAll(`.day`).forEach(e=>{e.querySelectorAll(`.step`).forEach((e,t)=>{e.style.transitionDelay=`${Math.min(t*.12,.5)}s`})});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramB.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.rope-line, .day-title, .step`).forEach(t=>e.observe(t)),document.querySelectorAll(`.day`).forEach(e=>{e.querySelectorAll(`.step`).forEach((e,t)=>{e.style.transitionDelay=`${Math.min(t*.12,.5)}s`})});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramC.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.rope-line, .day-title, .step`).forEach(t=>e.observe(t)),document.querySelectorAll(`.day`).forEach(e=>{e.querySelectorAll(`.step`).forEach((e,t)=>{e.style.transitionDelay=`${Math.min(t*.12,.5)}s`})});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramD.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.rope-line, .day-title, .step`).forEach(t=>e.observe(t)),document.querySelectorAll(`.day`).forEach(e=>{e.querySelectorAll(`.step`).forEach((e,t)=>{e.style.transitionDelay=`${Math.min(t*.12,.5)}s`})});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/SiteNav.astro?astro&type=script&index=0&lang.ts","var e=document.querySelector(`[data-nav-toggle]`),t=document.getElementById(`site-nav-menu`),n=document.querySelector(`.site-nav`);e&&t&&e.addEventListener(`click`,()=>{let r=t.classList.toggle(`is-open`);e.classList.toggle(`is-open`,r),n&&n.classList.toggle(`is-menu-open`,r),e.setAttribute(`aria-expanded`,String(r)),document.body.style.overflow=r?`hidden`:``,e.querySelectorAll(`.nav-toggle__bar`).forEach(e=>e.classList.toggle(`is-open`,r))}),document.querySelectorAll(`[data-submenu-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`li`);if(!t)return;let n=t.querySelector(`.submenu`);if(!n)return;n.classList.toggle(`is-open`),e.classList.toggle(`is-open`);let r=e.classList.contains(`is-open`);e.setAttribute(`aria-expanded`,String(r))})});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/contact.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/index.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t));var t=document.querySelector(`.landing-nav`);function n(){t?.classList.toggle(`is-scrolled`,window.scrollY>30)}n(),window.addEventListener(`scroll`,n,{passive:!0});"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/itineraire.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/le-mariage.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/legad.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/liste-mariage.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro?astro&type=script&index=0&lang.ts","var e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.unobserve(t.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(t=>e.observe(t));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro?astro&type=script&index=0&lang.ts","var e=document.querySelectorAll(`.tab-btn`),t=document.querySelectorAll(`.tab-panel`),n=document.querySelector(`.tabs`),r=document.querySelector(`.tabs-hint`);function i(){if(!n||!r)return;let e=n.scrollLeft,t=n.scrollWidth-n.clientWidth;r.classList.toggle(`is-visible`,e<t-2)}n&&(n.addEventListener(`scroll`,i,{passive:!0}),window.addEventListener(`resize`,i),i());function a(n,r=!0){let i=null;e.forEach(e=>{let t=e.dataset.tab===n;t&&(i=e),e.classList.toggle(`is-active`,t),e.setAttribute(`aria-selected`,String(t))}),t.forEach(e=>{e.classList.toggle(`is-active`,e.dataset.panel===n)}),i&&i.scrollIntoView({inline:`center`,behavior:`smooth`,block:`nearest`}),r&&history.pushState(null,``,`#${n}`)}e.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;t&&a(t),window.scrollTo({top:0,behavior:`smooth`})})});var o=window.location.hash.replace(`#`,``);a([`acces`,`logements`,`liste`,`legales`,`contact`].includes(o)?o:`acces`,!1);var s=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),s.unobserve(e.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(e=>s.observe(e));"],["C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/rsvp.astro?astro&type=script&index=0&lang.ts","function e(e,t){if(!t)return;let n=document.querySelectorAll(`input[name=\"${e}\"]`);if(!n.length)return;function r(){let n=document.querySelector(`input[name=\"${e}\"]:checked`),r=!n||n.value===`oui`;t.querySelectorAll(`input, select`).forEach(e=>{e.disabled=!r}),t.classList.toggle(`is-disabled`,!r)}n.forEach(e=>e.addEventListener(`change`,r)),r()}function t(e){let t=e.querySelector(`input[name$=\"_allergie_autre\"]`);if(!t)return;let n=e.querySelector(`.autre-cb`);if(!n)return;function r(){n.checked=t.value.trim()!==``,t.disabled=!n.checked}n.addEventListener(`change`,()=>{n.checked?(t.disabled=!1,t.focus()):(t.value=``,t.disabled=!0)}),t.addEventListener(`input`,()=>{n.checked=t.value.trim()!==``}),r()}function n(n){let r=n.dataset.guestPrefix;if(!r)return;let i=n.querySelector(`select[name=\"${r}_menu\"]`)?.closest(`.question`);i&&e(`${r}_dinner`,i),t(n)}document.querySelectorAll(`[data-guest-prefix]`).forEach(n),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-delete]`);if(!t)return;let n=t.closest(`fieldset`);n&&n.remove()});var r=document.getElementById(`add-guest-btn`),i=document.getElementById(`new-guest-template`),a=document.getElementById(`rsvp-form`);r&&i&&a&&r.addEventListener(`click`,()=>{let e=Date.now(),t=i.innerHTML.replace(/new_XX/g,`new_${e}`),o=document.createElement(`div`);o.innerHTML=t;let s=o.querySelector(`fieldset`);s&&(a.insertBefore(s,r),n(s),s.classList.remove(`is-visible`),requestAnimationFrame(()=>s.classList.add(`is-visible`)))});var o=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),o.unobserve(e.target))})},{threshold:.15});document.querySelectorAll(`.reveal, .reveal-line`).forEach(e=>o.observe(e));"]],"assets":["/_astro/SiteNav.k_h2y94C.css","/_astro/VenueMap.3iqvZXYP.css","/_astro/VenueMap.astro_astro_type_script_index_0_lang.BUXlQG7-.js","/_astro/le-mariage.DNFWoJTJ.css","/_astro/preparatifs.BhS0bGrL.css","/_astro/rsvp.BvUeucLN.css","/favicon.ico","/favicon.svg","/img/IMG-20261027.jpg","/img/Monogramme-white.png","/img/Monogramme2.png","/img/motif-corde-verticale.png","/img/photo_mains.jpg"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"VG1aKBORxfixcq4eYSjDGdUhxy+Mo3uyvRUL3HgLzOM=","image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./entrypoint_BV4wO1Yv.mjs"),
	middleware: () => import("../virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./_virtual_astro_session-driver_BWWe3pKI.mjs"),
	serverIslandMappings: () => import("./_virtual_astro_server-island-manifest_BhTW5IeR.mjs"),
	routes: manifestRoutes,
	pageMap
});
/**
* The ambient manifest: the explicitly registered one, else the virtual
* module's. Throws lazily when neither is available, so merely importing a
* module that uses this never fails — only actually handling a request does.
*/
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
// node_modules/astro/dist/core/app/render-options.js
/**
* Symbol used to attach `ResolvedRenderOptions` to a `Request` object so
* that they can flow through the `FetchHandler` signature (which only takes
* a request) into the request handler chain. This is an internal implementation
* detail between `BaseApp` and the default handler pipeline.
*/
var renderOptionsSymbol = Symbol.for("astro.renderOptions");
/**
* Reads `ResolvedRenderOptions` that were attached to a request via
* `renderOptionsSymbol`. Returns `undefined` if no options are attached.
*/
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
/**
* Attaches `ResolvedRenderOptions` to a request via `renderOptionsSymbol` so
* that downstream handlers can read them.
*/
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
// node_modules/astro/dist/core/app/origin-check.js
/**
* Content types that can be passed when sending a request via a form
*
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
* @private
*/
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
/**
* Determines whether a request should be rejected because it is a cross-site
* submission for a route rendered on demand.
*
* This encapsulates the shared logic used by both the origin-check middleware
* and the Astro Actions dispatch, so the check is applied consistently
* regardless of where the request is handled.
*
* @private
*/
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const contentType = request.headers.get("content-type");
	if (contentType && !hasFormLikeHeader(contentType)) return false;
	switch (request.headers.get("sec-fetch-site")) {
		case "":
		case null: break;
		case "same-origin":
		case "none": return false;
		default: return true;
	}
	const origin = request.headers.get("origin");
	if (!origin) return false;
	return origin !== url.origin;
}
/**
* Builds the 403 response returned when a cross-site submission is rejected.
*
* @private
*/
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
/**
* Returns middleware that rejects cross-origin form submissions.
*
* @private
*/
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
// node_modules/astro/dist/core/fetch/features.js
/**
* Bit flags for features that handler functions register as "used" when a
* custom `src/fetch.ts` fetch handler is in play. After the first request
* (dev) or at runtime (prod SSR), we compare against the manifest to warn
* about features the user configured but forgot to include in their custom
* fetch handler.
*/
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
/** All feature bits ORed together. Keep next to `FetchFeatures` so
*  new flags are hard to forget. */
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
/** ORs a feature bit into the manifest's used-features bitmask. */
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
/** The used-features bitmask for a manifest; `0` when nothing was marked. */
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
// node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
// node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, {
			OS: "Windows_NT",
			_: "C:/Program Files/nodejs/node.exe"
		})?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
function getActionPathFromString({ baseUrl, shouldAppendTrailingSlash, path: input }) {
	let path = `${baseUrl.replace(/\/$/, "")}/_actions/${new URLSearchParams(input).get(ACTION_QUERY_PARAMS.actionName)}`;
	if (shouldAppendTrailingSlash) path = appendForwardSlash(path);
	return path;
}
function createGetActionPath(options) {
	return function getActionPath(action) {
		return getActionPathFromString({
			baseUrl: options.baseUrl,
			shouldAppendTrailingSlash: options.shouldAppendTrailingSlash,
			path: action.toString()
		});
	};
}
var ENCODED_DOT = "%2E";
function createActionsProxy({ actionCallback = {}, aggregatedPath = "", handleAction }) {
	return new Proxy(actionCallback, { get(target, objKey) {
		if (target.hasOwnProperty(objKey) || typeof objKey === "symbol") return target[objKey];
		const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
		function action(param) {
			return handleAction(param, path, this);
		}
		Object.assign(action, {
			queryString: getActionQueryString(path),
			toString: () => action.queryString,
			bind: action.bind,
			valueOf: () => action.valueOf,
			$$FORM_ACTION: function() {
				return {
					method: "POST",
					name: "_astroAction",
					action: "?" + new URLSearchParams(action.toString()).toString()
				};
			},
			async orThrow(param) {
				const { data, error } = await handleAction(param, path, this);
				if (error) throw error;
				return data;
			}
		});
		return createActionsProxy({
			actionCallback: action,
			aggregatedPath: path + ".",
			handleAction
		});
	} });
}
// node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
// node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	#logger;
	constructor(request, logger) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
		this.#logger = logger;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value !== void 0) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
// node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
// node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
// node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
// node_modules/astro/dist/i18n/fallback.js
/**
* Compute fallback route for failed responses.
* Pure function - no APIContext, no Response objects, no URL objects.
*
* This function determines whether a failed request should be redirected or rewritten
* to a fallback locale based on the i18n configuration.
*/
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const segments = pathname.split("/");
	const urlLocale = segments.find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	const localeIndex = segments.indexOf(urlLocale);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		segments.splice(localeIndex, 1);
		newPathname = segments.join("/") || "/";
	} else {
		segments[localeIndex] = pathFallbackLocale;
		newPathname = segments.join("/");
	}
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
// node_modules/astro/dist/i18n/router.js
/**
* Router for i18n routing strategy decisions.
* Determines whether to continue, redirect, or return 404 based on pathname and locale.
*
* This is a pure class that returns decision objects (not HTTP Responses).
* The middleware layer is responsible for converting decisions to HTTP responses.
*/
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		for (const page of STATUS_CODE_PAGES) if (pathname.includes(page)) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
// node_modules/astro/dist/core/i18n/handler.js
/**
* Pure compile from explicit values — used by `astro:i18n`'s manual-mode
* middleware wrapper (`src/i18n/middleware.ts`), which receives the values as
* arguments rather than reading a manifest.
*/
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
/**
* The compiled i18n post-processor for a manifest, or `null` when i18n is
* unset or the routing strategy is `manual`.
*/
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
/**
* Post-processes a rendered `Response` against the compiled i18n
* configuration, as an explicit step in `handleRequest` after the middleware
* chain returns. The manual-strategy public API (`astro:i18n.middleware(...)`)
* wraps this in a middleware-shaped closure.
*/
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const routeData = state.routeData;
	const isPrerendered = routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false,
		allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": try {
				return await state.rewrite(fallbackDecision.pathname + url.search);
			} catch {
				break;
			}
		}
	}
	return response;
}
// node_modules/astro/dist/i18n/index.js
/**
* Given a locale (code), it returns its corresponding path
* @param locale
* @param locales
*/
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
/**
* Returns an array of only locales, by picking the `code`
* @param locales
*/
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
// node_modules/astro/dist/i18n/utils.js
/**
* Parses the value of the `Accept-Language` header:
*
* More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
*
* Complex example: `fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`
*
*/
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		const qa = a.locale === "*" ? a.qualityValue ?? 0 : a.qualityValue ?? 1;
		return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
	});
}
/**
* Set the current locale by parsing the value passed from the `Accept-Header`.
*
* If multiple locales are present in the header, they are sorted by their quality value and the highest is selected as current locale.
*
*/
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
/**
* Check if any of the route's resolved param values match a configured locale.
* This handles dynamic routes like `[locale]` or `[...path]` where the locale
* isn't in a static segment of the route pathname.
*/
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
// node_modules/astro/dist/core/app/prepare-response.js
/**
* Appends cookies written via `Astro.cookie.set()` to the `Set-Cookie` header
* and marks the response as sent.
*
* This is a pure function with no dependencies on the app; it is shared by
* `handleRequest` and the various error handlers.
*/
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
// node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
/**
* Handles dispatch of a matched route (endpoint / redirect / page / fallback)
* at the bottom of the middleware chain. This is a pure dispatch layer — it
* renders whatever route the `FetchState` currently points to without any
* rewrite logic. Rewrites are handled upstream: `executeRewrite()` for
* `Astro.rewrite()` and `handleMiddleware` for `next(payload)`.
*
* `handlePages` is the `next` callback that `handleMiddleware` invokes at
* the end of the middleware chain. Error handlers and the container also
* use it directly for the same dispatch behavior.
*/
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (isRoute404(state.routeData.route) || isRoute500(state.routeData.route)) state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/routing/match.js
/** Find matching route from pathname */
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
/**
* Determines if the given route matches a 404 or 500 error page.
*
* @param {RouteData} route - The route data to check.
* @returns {boolean} `true` if the route matches a 404 or 500 error page; otherwise, `false`.
*/
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
/**
* Determines if a given route is associated with the server island component.
*
* @param {RouteData} route - The route data object to evaluate.
* @return {boolean} Returns true if the route's component is the server island component; otherwise, false.
*/
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
// node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => isRoute404(route.route))) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
// node_modules/astro/dist/core/routing/priority.js
/**
* Comparator for sorting routes in resolution order.
*
* The routes are sorted in by the following rules in order, following the first rule that
* applies:
* - More specific routes are sorted before less specific routes. Here, "specific" means
*   the number of segments in the route, so a parent route is always sorted after its children.
*   For example, `/foo/bar` is sorted before `/foo`.
*   Index routes, originating from a file named `index.astro`, are considered to have one more
*   segment than the URL they represent.
* - Static routes are sorted before dynamic routes.
*   For example, `/foo/bar` is sorted before `/foo/[bar]`.
* - Dynamic routes with single parameters are sorted before dynamic routes with rest parameters.
*   For example, `/foo/[bar]` is sorted before `/foo/[...bar]`.
* - Prerendered routes are sorted before non-prerendered routes.
* - Endpoints are sorted before pages.
*   For example, a file `/foo.ts` is sorted before `/bar.astro`.
* - If both routes are equal regarding all previous conditions, they are sorted alphabetically.
*   For example, `/bar` is sorted before `/foo`.
*   The definition of "alphabetically" is dependent on the default locale of the running system.
*/
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
// node_modules/astro/dist/core/routing/router.js
/**
* Matches request pathnames against a route list with base and trailing slash rules.
*/
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
/**
* Normalize a base path to a leading-slash form.
*/
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
/**
* Provide a redirect target for pathnames that need correction.
* - Ensures a leading slash.
* - Collapses multiple leading slashes into a single slash redirect.
*/
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
/**
* Strip the configured base from the pathname and account for trailing slash policies.
* Returns null if the pathname is outside the base or should be redirected elsewhere.
*/
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
/**
* Normalize file-format pathnames by removing .html and /index.html suffixes.
*/
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
// node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
/**
* The route table for a manifest: the derived route list (with the default
* 404 ensured) and the compiled router. All route reads — matching, rewrites,
* custom-404 fallbacks, `manifestData` accessors — go through this single
* entry so dev HMR updates are visible to every consumer at once.
*/
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
/**
* Atomically replaces the route table for a manifest (dev `astro:routes-updated`).
* Runs `ensure404Route` on the new list, compiles a fresh `Router`, and swaps
* the memo entry in one step, so no consumer can observe a half-updated table.
*/
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
/**
* Low-level route matching against the manifest routes. Returns the matched
* `RouteData` or `undefined`. Does not filter prerendered routes or check
* public assets — use the app-level match for that.
*/
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
/**
* Returns all routes matching the given pathname, in priority order. Used when
* the first match cannot serve the request (e.g. a prerendered dynamic route
* that doesn't cover this specific path) and the caller needs to try
* subsequent matches.
*/
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
// node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
/** Resolves the cache provider from the manifest, `null` when none. */
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
// node_modules/astro/dist/core/cache/runtime/utils.js
/**
* Generate default cache response headers from CacheOptions.
* Used when the provider doesn't supply its own `setHeaders()`.
*/
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
// node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = Symbol.for("astro:cache:apply");
var IS_ACTIVE = Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
		if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
/**
* Apply cache headers to a response.
*/
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
// node_modules/astro/dist/core/cache/runtime/noop.js
/**
* A no-op cache implementation used in dev mode when cache is configured.
* The API is available so user code doesn't need conditional checks,
* but nothing is actually cached.
*/
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
/**
* A no-op cache used when cache is not configured.
* Logs a warning on first use instead of throwing, so libraries
* can call cache methods without needing try/catch.
* `invalidate()` still throws since it implies the caller
* expects purging to actually work.
*/
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
// node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} — parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
// node_modules/astro/dist/core/cache/runtime/route-matching.js
/**
* Compile config-level cache route patterns into RegExps.
* The result is memoized on the pipeline — this function is only called once,
* on the first request that needs route matching.
* Returns compiled patterns sorted by Astro's standard route priority (most specific first).
*/
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
/**
* Called per-request to find the first matching cache rule for a given pathname.
*/
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
// node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
/**
* Registers a cache provider on the given `FetchState`. When
* `state.resolve('cache')` is first called, the appropriate cache
* implementation is created (disabled, noop for dev, or real).
*
* Returns synchronously when cache is not configured or in dev mode.
*/
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
/**
* Wraps a render callback with cache provider logic. Handles both
* runtime caching (onRequest) and CDN-based providers (headers only).
*
* - When a cache provider with `onRequest` is configured, the callback
*   is wrapped so the provider can serve from cache or fall through.
* - When only CDN headers are needed, the callback runs directly and
*   cache headers are applied to the response.
* - When no cache provider is configured, the callback runs as-is.
*
* Cache headers (`CDN-Cache-Control`, `Cache-Tag`) are stripped from
* the final response after the runtime provider has read them.
*/
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil,
			logger: {
				info(msg) {
					state.logger.info("cache", msg);
				},
				warn(msg) {
					state.logger.warn("cache", msg);
				},
				error(msg) {
					state.logger.error("cache", msg);
				}
			}
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response.headers.delete("CDN-Cache-Control");
		response.headers.delete("Cache-Tag");
		return response;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
/**
* Config-level cache routes compiled from `manifest.cacheConfig`, derived
* lazily on the first cache-seeded request.
*/
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
// node_modules/astro/dist/core/session/provider-disabled.js
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
}
// node_modules/astro/dist/core/app/validate-headers.js
/**
* Parses a potentially comma-separated multi-value header (as produced by
* proxy chains) and returns the first value, trimmed of whitespace.
* Returns `undefined` when the header is absent or empty.
*/
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
/**
* Sanitize a hostname by rejecting any with path separators.
* Prevents path injection attacks. Invalid hostnames return undefined.
*/
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
/**
* Parse a host string into hostname and port components. Returns `undefined`
* for a host that carries more than a single `hostname:port` pair (e.g.
* `example.com:8080:8080`), which is not a valid host and would otherwise be
* accepted by inspecting only the first two segments.
*/
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
/**
* Check if a host matches any of the allowed domain patterns.
* Assumes hostname and port are already sanitized/parsed.
*/
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
/**
* Validate a host against allowedDomains.
* Returns the host only if it matches an allowed pattern; otherwise, undefined.
* This prevents SSRF attacks by ensuring the Host header is trusted.
*/
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
/**
* Validate forwarded headers (proto, host, port) against allowedDomains.
* Returns validated values or undefined for rejected headers.
* Uses strict defaults: http/https only for proto, rejects port if not in allowedDomains.
*/
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
// node_modules/astro/dist/core/output-filename.js
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
// node_modules/astro/dist/core/errors/default-handler.js
/**
* The default error strategy used in production SSR. Attempts to render the
* matching error route (404.astro / 500.astro), falling back to a plain
* response with the given status. Handles prerendered error pages via
* `prerenderedErrorPageFetch`.
*/
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response, resolvedRenderOptions);
				return response;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
// node_modules/astro/dist/core/errors/build-handler.js
/**
* The error strategy used during static build / prerendering.
*
* - For 500 errors, returns the original response if present, otherwise
*   throws so the build surfaces the underlying error to the developer.
* - For other errors (e.g. 404), delegates to `renderDefaultError` with
*   `prerenderedErrorPageFetch` cleared (the build pipeline can't fetch
*   prerendered pages the way production SSR can).
*/
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
// node_modules/astro/dist/core/errors/dev-handler.js
/**
* The dev-server error strategy. Renders custom 404/500 routes if the user
* has them, otherwise throws so Vite's dev overlay is shown. Shared between
* the Vite dev server and the non-runnable dev pipeline; only
* `shouldInjectCspMetaTags` differs between them (carried by the
* environment record's `injectCspMetaTagsOnErrorPages` static).
*/
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
// node_modules/astro/dist/core/errors/handler.js
/**
* Renders the error page (404.astro / 500.astro or a plain response) for a
* request, dispatching to the strategy the manifest's environment selects:
* production/container default, dev (overlay + custom error routes, with or
* without CSP meta-tag injection), or build (500s throw so the build fails).
*/
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
/**
* Dispatches an internal error render for a request flowing through the
* handler chain: through the facade's late-bound `renderError` hook when the
* state was built by `BaseApp.render`'s fast path (preserving instance
* overrides/reassignments, e.g. cloudflare's prerender-error propagation),
* else through the environment's strategy via {@link renderErrorPage}.
*/
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
/**
* Whether a middleware rewrite (`ctx.rewrite()` / `next(payload)`) issued while
* rendering the error page dead-ended in another empty reroutable (404/500)
* response. The rewrite swaps the state's routeData away from the error route,
* so returning that render as-is would produce a blank page; the error handler
* should instead retry rendering the error page without middleware.
*
* @param skipMiddleware Whether middleware was already skipped for this render.
* @param errorRouteData The error route matched before middleware ran.
* @param renderedRouteData The route data on the state after middleware ran.
* @param response The response produced by the middleware-driven render.
*/
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
// node_modules/astro/dist/core/middleware/callMiddleware.js
/**
* Utility function that is in charge of calling the middleware.
*
* It accepts a `R` generic, which usually is the `Response` returned.
* It is a generic because endpoints can return a different payload.
*
* When calling a middleware, we provide a `next` function, this function might or
* might not be called.
*
* A middleware, to behave correctly, can:
* - return a `Response`;
* - call `next`;
*
* Failing doing so will result an error. A middleware can call `next` and do not return a
* response. A middleware cannot call `next` and return a new `Response` from scratch (maybe with a redirect).
*
* ```js
* const onRequest = async (context, next) => {
*   const response = await next(context);
*   return response;
* }
* ```
*
* ```js
* const onRequest = async (context, next) => {
*   context.locals = "foo";
*   next();
* }
* ```
*
* @param onRequest The function called which accepts a `context` and a `resolve` function
* @param apiContext The API context
* @param responseFunction A callback function that should return a promise with the response
*/
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			/**
			* Then we check if a value is returned. If so, we need to return the value returned by the
			* middleware.
			* e.g.
			* ```js
			* 	const response = await next();
			* 	const new Response(null, { status: 500, headers: response.headers });
			* ```
			*/
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined")
 /**
		* There might be cases where `next` isn't called and the middleware **must** return
		* something.
		*
		* If not thing is returned, then we raise an Astro error.
		*/
		throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
// node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
/**
* Resolves the middleware from the manifest and returns the `onRequest`
* function (prefixed with the origin-check middleware when configured). If
* `onRequest` isn't there, it returns a no-op function.
*/
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
// node_modules/astro/dist/core/middleware/astro-middleware.js
/**
* Runs Astro's middleware chain (origin check + user `onRequest`) for a
* single render, reading the composed middleware from the manifest and
* per-request data (componentInstance, slots, props, API contexts) off the
* supplied `FetchState`. The actual route dispatch (endpoint / redirect /
* page / fallback) is supplied by the caller as `renderRouteCallback` —
* typically `handlePages`.
*/
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/util/normalized-url.js
/**
* Creates a normalized URL from a request URL string.
* Decodes and validates the pathname, collapses duplicate slashes.
*/
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
/**
* Assigns `url.pathname` only when the value differs.
* The setter re-parses the whole URL, so a no-op write is still expensive.
*/
function setPathname(url, pathname) {
	if (url.pathname !== pathname) url.pathname = pathname;
}
/**
* Normalizes an already-parsed URL in place: decodes and validates the
* pathname, collapses duplicate slashes. Returns the same URL object.
*
* Collapse runs after the decode is written back: the pathname setter
* rewrites `\` to `/`, so a decoded backslash only becomes `//` once assigned.
*/
function normalizeUrl(url) {
	try {
		setPathname(url, validateAndDecodePathname(url.pathname));
	} catch {
		try {
			setPathname(url, decodeURI(url.pathname));
		} catch {}
	}
	setPathname(url, collapseDuplicateSlashes(url.pathname));
	return url;
}
// node_modules/astro/dist/core/rewrites/handler.js
/**
* Validates and applies a rewrite target to the given `FetchState`.
*
* - Validates that SSR→prerender rewrites are not attempted (except
*   for i18n fallback routes).
* - Mutates `state` to reflect the new route: request, URL, cookies,
*   params, pathname, component instance, etc.
* - Invalidates cached API contexts so they're re-derived from the
*   new route.
*
* Called by both `executeRewrite()` (user-triggered `Astro.rewrite`)
* and `handleMiddleware` (middleware `next(payload)`).
*/
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request, state.logger);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
/**
* Executes a user-triggered rewrite (`Astro.rewrite(...)` /
* `ctx.rewrite(...)`) against a `FetchState`. Resolves the rewrite
* target via the environment's `tryRewrite`, validates it, mutates the
* `FetchState` to reflect the new route, and re-runs the middleware
* and page dispatch to produce the new response.
*/
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
// node_modules/astro/dist/core/i18n/domain.js
/**
* For domain-based i18n routing strategies, derives the locale-prefixed
* pathname from the request's `Host` header rather than its URL. For example,
* a request for `/foo` served from `https://example.fr` resolves to `/fr/foo`.
*
* Returns `undefined` when the strategy isn't domain-based or the host isn't
* mapped to a locale — in which case normal pathname routing applies.
*
*/
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		const validated = validateForwardedHeaders(getFirstForwardedValue(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains);
		const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
		const requestHost = request.headers.get("Host") ?? void 0;
		const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
		let host = validated.host ?? validatedRequestHost;
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
// node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
/** The manifest's `site` as a `URL` (used for `Astro.site`). */
function getSite(manifest) {
	return sites.get(manifest);
}
// node_modules/astro/dist/core/server-islands/mappings.js
/**
* The server-island mappings for a manifest. Deliberately NOT memoized: the
* manifest thunk is a module import, which is cheap.
*/
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
// node_modules/astro/dist/core/fetch/fetch-state.js
var slotValuesSymbol = Symbol("astro.slotValues");
/**
* Retrieves the `FetchState` stashed on an `APIContext` by
* `FetchState.getAPIContext()`. Throws if not found — this indicates
* the context was not created through Astro's request pipeline.
*/
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
/**
* Holds per-request state as it flows through the handler pipeline.
*
* **This class is user-facing** via `astro/fetch` and `astro/hono`.
* The {@link AstroFetchState} interface defines the stable public
* surface. Members not on that interface are internal and
* may change without notice.
*
* Performance note: fields on this class are plain properties — ES
* private fields (`#foo`) have a non-zero per-access cost in V8
* which is measurable on the hot render path, so `#` is used only
* for rarely-accessed memoized caches and Maps.
*/
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/** Explicitly assigned status; `undefined` until a caller sets one. */
	#status;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	* Reads `200` until assigned.
	*/
	get status() {
		return this.#status ?? 200;
	}
	set status(value) {
		this.#status = value;
	}
	/**
	* Sets `status` from the matched route (see `getDefaultStatusCode`)
	* unless a caller already assigned one.
	*/
	applyDefaultStatus() {
		if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
	}
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		setPathname(url, publicPathname);
		setPathname(url, collapseDuplicateSlashes(url.pathname));
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request, this.logger);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const Astro = Object.assign(Object.create(astroPagePartial), {
			props,
			self: null
		});
		Object.defineProperty(Astro, slotValuesSymbol, {
			value: slotValues,
			writable: true,
			configurable: true,
			enumerable: false
		});
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get slots() {
				const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
				let slots = slotsByAstro.get(this);
				if (slots === void 0) {
					slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
					slotsByAstro.set(this, slots);
				}
				return slots;
			},
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(logger);
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			const original = this.pathname;
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
			if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(state.logger);
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Called before `getProps()` has resolved, the context carries
	* `props: null` and is not memoized; the next call after `getProps()`
	* fills in `props` on the same object. Callers that read `props`
	* must await `getProps()` first.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		const apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		if (this.props !== null) this.apiContext = apiContext;
		return apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
// node_modules/@astrojs/internal-helpers/dist/object.js
/**
* Keys that must be rejected when traversing object paths (e.g. dot-separated
* property lookups) to prevent prototype-pollution attacks.
*/
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
// node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
// node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
/** Resolves the actions module from the manifest (a no-op module when none). */
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
/** Looks up a single action handler by its dot-separated path. */
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
// node_modules/astro/dist/actions/runtime/server.js
function defineAction({ accept, input: inputSchema, handler }) {
	const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
	async function safeServerHandler(unparsedInput) {
		if (typeof this === "function" || !isActionAPIContext(this)) throw new AstroError(ActionCalledFromServerError);
		return callSafely(() => serverHandler(unparsedInput, this));
	}
	Object.assign(safeServerHandler, { orThrow(unparsedInput) {
		if (typeof this === "function") throw new AstroError(ActionCalledFromServerError);
		return serverHandler(unparsedInput, this);
	} });
	return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
	return async (unparsedInput, context) => {
		if (!(unparsedInput instanceof FormData)) throw new ActionError({
			code: "UNSUPPORTED_MEDIA_TYPE",
			message: "This action only accepts FormData."
		});
		if (!inputSchema) return await handler(unparsedInput, context);
		const parsed = await parseFormInput(inputSchema, unparsedInput);
		if (!parsed.success) throw new ActionInputError(parsed.error.issues);
		return await handler(parsed.data, context);
	};
}
async function parseFormInput(inputSchema, unparsedInput) {
	const baseSchema = unwrapBaseZ4ObjectSchema(inputSchema, unparsedInput);
	const input = baseSchema instanceof z.$ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput;
	return await z.safeParseAsync(inputSchema, input);
}
function getJsonServerHandler(handler, inputSchema) {
	return async (unparsedInput, context) => {
		if (unparsedInput instanceof FormData) throw new ActionError({
			code: "UNSUPPORTED_MEDIA_TYPE",
			message: "This action only accepts JSON."
		});
		if (!inputSchema) return await handler(unparsedInput, context);
		const parsed = await z.safeParseAsync(inputSchema, unparsedInput);
		if (!parsed.success) throw new ActionInputError(parsed.error.issues);
		return await handler(parsed.data, context);
	};
}
/**
* Access information about Action requests from middleware.
*/
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				if (error instanceof URIError) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				if (e instanceof SyntaxError) return {
					data: void 0,
					error: new ActionError({
						code: "BAD_REQUEST",
						message: "Invalid JSON request body"
					})
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function isActionAPIContext(ctx) {
	return Reflect.get(ctx, ACTION_API_CONTEXT_SYMBOL) === true;
}
/** Transform form data to an object based on a Zod schema. */
function formDataToObject(formData, schema, prefix = "") {
	const formKeys = [...formData.keys()];
	const obj = schema._zod.def.catchall ? Object.fromEntries([...formData.entries()].filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k.slice(prefix.length), v])) : {};
	for (const [key, baseValidator] of Object.entries(schema._zod.def.shape)) {
		const prefixedKey = prefix + key;
		let validator = baseValidator;
		while (validator instanceof z.$ZodOptional || validator instanceof z.$ZodNullable || validator instanceof z.$ZodDefault) {
			if (validator instanceof z.$ZodDefault && !formDataHasKeyOrPrefix(formKeys, prefixedKey)) obj[key] = validator._zod.def.defaultValue instanceof Function ? validator._zod.def.defaultValue() : validator._zod.def.defaultValue;
			validator = validator._zod.def.innerType;
		}
		while (validator instanceof z.$ZodPipe) validator = validator._zod.def.in;
		if (validator instanceof z.$ZodDiscriminatedUnion) {
			const typeKey = validator._zod.def.discriminator;
			const typeValue = formData.get(prefixedKey + "." + typeKey);
			if (typeof typeValue === "string") {
				const match = validator._zod.def.options.find((option) => option.def.shape[typeKey].values.has(typeValue));
				if (match) validator = match;
			}
		}
		if (validator instanceof z.$ZodObject) {
			const nestedPrefix = prefixedKey + ".";
			if (formKeys.some((k) => k.startsWith(nestedPrefix))) obj[key] = formDataToObject(formData, validator, nestedPrefix);
			else if (!(key in obj)) obj[key] = baseValidator instanceof z.$ZodNullable ? null : void 0;
		} else if (!formData.has(prefixedKey) && key in obj) continue;
		else if (validator instanceof z.$ZodBoolean) {
			const val = formData.get(prefixedKey);
			obj[key] = val === "true" ? true : val === "false" ? false : formData.has(prefixedKey);
		} else if (validator instanceof z.$ZodArray) obj[key] = handleFormDataGetAll(prefixedKey, formData, validator);
		else obj[key] = handleFormDataGet(prefixedKey, formData, validator, baseValidator);
	}
	return obj;
}
/** Check if formKeys contains an exact key or any keys with the given prefix (for nested objects). */
function formDataHasKeyOrPrefix(formKeys, key) {
	const prefix = key + ".";
	return formKeys.some((k) => k === key || k.startsWith(prefix));
}
function handleFormDataGetAll(key, formData, validator) {
	const entries = Array.from(formData.getAll(key));
	const elementValidator = validator._zod.def.element;
	if (elementValidator instanceof z.$ZodNumber) return entries.map(Number);
	else if (elementValidator instanceof z.$ZodBoolean) return entries.map((v) => v === "true" ? true : v === "false" ? false : Boolean(v));
	return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
	const value = formData.get(key);
	if (!value) return baseValidator instanceof z.$ZodOptional ? void 0 : null;
	return validator instanceof z.$ZodNumber ? Number(value) : value;
}
function unwrapBaseZ4ObjectSchema(schema, unparsedInput) {
	if (schema instanceof z.$ZodPipe) return unwrapBaseZ4ObjectSchema(schema._zod.def.in, unparsedInput);
	if (schema instanceof z.$ZodDiscriminatedUnion) {
		const typeKey = schema._zod.def.discriminator;
		const typeValue = unparsedInput.get(typeKey);
		if (typeof typeValue !== "string") return schema;
		const objSchema = schema._zod.def.options.find((option) => option.def.shape[typeKey].values.has(typeValue));
		if (!objSchema) return schema;
		return objSchema;
	}
	return schema;
}
async function callSafely(handler) {
	try {
		return {
			data: await handler(),
			error: void 0
		};
	} catch (e) {
		if (e instanceof ActionError) return {
			data: void 0,
			error: e
		};
		return {
			data: void 0,
			error: new ActionError({
				message: e instanceof Error ? e.message : "Unknown error",
				code: "INTERNAL_SERVER_ERROR"
			})
		};
	}
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, {
			OS: "Windows_NT",
			_: "C:/Program Files/nodejs/node.exe"
		})?.DEV) actionResultErrorStack.set(res.error.stack);
		let body;
		if (res.error instanceof ActionInputError) body = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
export { createCrossOriginForbiddenResponse as A, createActionsProxy as C, FetchFeatures as D, ALL_FETCH_FEATURES as E, manifest as F, getRenderOptions as M, setRenderOptions as N, getUsedFeatures as O, getAmbientManifest as P, ActionError as S, isActionError as T, handlePages as _, FetchState as a, getI18n as b, renderErrorFromState as c, handleCache as d, provideCache as f, updateRouteTable as g, matchRoute as h, getAction as i, isForbiddenCrossOriginRequest as j, markFeatureUsed as k, renderErrorPage as l, matchAllRoutes as m, getActionContext as n, computePathnameFromDomain as o, getRouteTable as p, serializeActionResult as r, handleMiddleware as s, defineAction as t, provideSession as u, prepareResponse as v, createGetActionPath as w, getSetCookiesFromResponse as x, finalizeI18n as y };
