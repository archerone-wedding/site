import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { t as createComponent } from "./compiler_Dw1JVzKQ.mjs";
import { t as createAstro } from "./astro-global_CbcmTR0i.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
import { t as $$PageLayout } from "./PageLayout_CK5sexY-.mjs";
// src/components/program/ProgramA.astro
var $$ProgramA = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="program-content"><h2>Programme A</h2><p>À compléter par Tiffany et Charles.</p></div>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramA.astro", void 0);
// src/components/program/ProgramB.astro
var $$ProgramB = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="program-content"><h2>Programme B</h2><p>À compléter par Tiffany et Charles.</p></div>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramB.astro", void 0);
// src/components/program/ProgramC.astro
var $$ProgramC = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="program-content"><h2>Programme C</h2><p>À compléter par Tiffany et Charles.</p></div>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramC.astro", void 0);
// src/components/program/ProgramD.astro
var $$ProgramD = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="program-content"><h2>Programme D</h2><p>À compléter par Tiffany et Charles.</p></div>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/components/program/ProgramD.astro", void 0);
// src/pages/le-mariage.astro
var le_mariage_exports = /* @__PURE__ */ __exportAll({
	default: () => $$LeMariage,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$LeMariage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LeMariage;
	const cat = Astro.locals.group?.category || "A";
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Le mariage — ${site.name}`,
		"data-astro-cid-mbkxrqej": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-mbkxrqej><h1 data-astro-cid-mbkxrqej>Le programme</h1>${cat === "A" && renderTemplate`${renderComponent($$result, "ProgramA", $$ProgramA, { "data-astro-cid-mbkxrqej": true })}`}${cat === "B" && renderTemplate`${renderComponent($$result, "ProgramB", $$ProgramB, { "data-astro-cid-mbkxrqej": true })}`}${cat === "C" && renderTemplate`${renderComponent($$result, "ProgramC", $$ProgramC, { "data-astro-cid-mbkxrqej": true })}`}${cat === "D" && renderTemplate`${renderComponent($$result, "ProgramD", $$ProgramD, { "data-astro-cid-mbkxrqej": true })}`}</section>` })}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/le-mariage.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/le-mariage.astro";
var $$url = "/le-mariage";
// \0virtual:astro:page:src/pages/le-mariage@_@astro
var page = () => le_mariage_exports;
export { page };
