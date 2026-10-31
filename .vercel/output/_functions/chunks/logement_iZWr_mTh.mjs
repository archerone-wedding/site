import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_CDfxEMrF.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
import { t as $$PageLayout } from "./PageLayout_Bw0I5DRm.mjs";
// src/pages/logement.astro
var logement_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Logement,
	file: () => $$file,
	url: () => $$url
});
var $$Logement = createComponent(($$result, $$props, $$slots) => {
	const logements = [
		{
			name: "LA MAISON SAINT NICOLAS",
			url: "https://www.maison-saint-nicolas.com/",
			couchages: 30,
			distance: "5,6 km",
			rep: "2 gîtes, 23 et 7 couchages"
		},
		{
			name: "LA MAISON DES AMIS",
			url: "https://maisonsdesamis.fr/",
			couchages: 22,
			distance: "10,6 km",
			rep: "2 gîtes, 10 et 12 couchages"
		},
		{
			name: "LE CLOS DES MARTINES",
			url: "https://leclosdesmartines.com/fr/",
			couchages: 16,
			distance: "1,6 km",
			rep: "1 gîte"
		},
		{
			name: "L'ABACA GÎTES",
			url: "https://www.greengo.voyage/hote/l-abaca-gites",
			couchages: 16,
			distance: "13,7 km",
			rep: "4 gîtes, de 2 à 6 couchages"
		},
		{
			name: "GÎTE DU LION D'OR",
			url: "https://www.gites-de-france.com/fr/normandie/eure/gite-du-lion-dor-27g1100",
			couchages: 15,
			distance: "6,5 km",
			rep: "1 gîte"
		},
		{
			name: "LE CLOS SAINT PAUL",
			url: "https://www.clos-saint-paul.com/",
			couchages: 10,
			distance: "7,4 km",
			rep: "1 gîte et 2 chambres"
		},
		{
			name: "LA BICOQUE NORMANDE",
			url: "https://www.labicoquenormande.fr/",
			couchages: 4,
			distance: "5,6 km",
			rep: "1 gîte, au bord de l'eau"
		}
	];
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Logements — ${site.name}`,
		"data-astro-cid-h6h77ywd": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-h6h77ywd><div class="page-header" data-astro-cid-h6h77ywd><h1 class="reveal" data-astro-cid-h6h77ywd>Logements</h1><div class="section-separator reveal-line" data-astro-cid-h6h77ywd></div></div><p class="intro reveal" data-astro-cid-h6h77ywd>Vous trouverez ci-dessous une liste de logements situés à proximité du lieu de réception.</p><div class="lodging-table reveal" data-astro-cid-h6h77ywd><table data-astro-cid-h6h77ywd><thead data-astro-cid-h6h77ywd><tr data-astro-cid-h6h77ywd><th data-astro-cid-h6h77ywd>Établissement</th><th class="num" data-astro-cid-h6h77ywd>Couchages</th><th data-astro-cid-h6h77ywd>Distance</th><th data-astro-cid-h6h77ywd>Répartition</th></tr></thead><tbody data-astro-cid-h6h77ywd>${logements.map((l) => renderTemplate`<tr data-astro-cid-h6h77ywd><td data-astro-cid-h6h77ywd><a${addAttribute(l.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-h6h77ywd>${l.name}<span class="arrow" data-astro-cid-h6h77ywd>›</span></a></td><td class="num" data-astro-cid-h6h77ywd>${l.couchages}</td><td data-astro-cid-h6h77ywd>${l.distance}</td><td data-astro-cid-h6h77ywd>${l.rep}</td></tr>`)}</tbody></table></div></section>` })}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/logement.astro";
var $$url = "/logement";
// \0virtual:astro:page:src/pages/logement@_@astro
var page = () => logement_exports;
export { page };
