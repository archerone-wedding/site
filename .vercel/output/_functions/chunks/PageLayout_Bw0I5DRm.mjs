import { E as renderComponent, M as renderTemplate, N as maybeRenderHead, k as renderSlot } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { n as $$Layout, t as $$SiteNav } from "./SiteNav_CDfxEMrF.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
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
		"header": ($$result) => renderTemplate`${maybeRenderHead($$result)}<header data-astro-cid-xa52sxzc>${renderComponent($$result, "SiteNav", $$SiteNav, {
			"variant": "bar",
			"data-astro-cid-xa52sxzc": true
		})}</header>`
	})}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/layouts/PageLayout.astro", void 0);
export { $$PageLayout as t };
