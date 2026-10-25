import { E as renderComponent, M as renderTemplate, N as maybeRenderHead, k as renderSlot } from "./sequence_DKkBVb9G.mjs";
import { t as createComponent } from "./compiler_Dw1JVzKQ.mjs";
import { t as createAstro } from "./astro-global_CbcmTR0i.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { n as $$Layout, t as $$SiteNav } from "./SiteNav_DKhr69oD.mjs";
// src/layouts/PageLayout.astro
createAstro("https://astro.build");
var $$PageLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageLayout;
	const { title = site.name, description } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": title,
		"description": description,
		"data-astro-cid-xa52sxzc": true
	}, {
		"default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}`,
		"header": ($$result) => renderTemplate`${maybeRenderHead($$result)}<header class="page-header" data-astro-cid-xa52sxzc>${renderComponent($$result, "SiteNav", $$SiteNav, {
			"variant": "bar",
			"data-astro-cid-xa52sxzc": true
		})}</header>`
	})}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/layouts/PageLayout.astro", void 0);
export { $$PageLayout as t };
