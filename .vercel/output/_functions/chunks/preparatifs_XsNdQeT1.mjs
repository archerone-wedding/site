import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DKkBVb9G.mjs";
import { n as createComponent } from "./compiler_B21378Bx.mjs";
import { r as renderScript } from "./SiteNav_CDfxEMrF.mjs";
import { n as site } from "./site_hYnZ1M7a.mjs";
import { t as $$PageLayout } from "./PageLayout_Bw0I5DRm.mjs";
import { a as contact, c as venueDirectionsUrl, i as churchOsmUrl, l as venueOsmUrl, n as churchAddress, o as venue, r as churchDirectionsUrl, s as venueAddress, t as church } from "./wedding_C-Ux7YO-.mjs";
import { t as $$VenueMap } from "./VenueMap_D1VRj3kq.mjs";
// src/pages/preparatifs.astro
var preparatifs_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Preparatifs,
	file: () => $$file,
	url: () => $$url
});
var $$Preparatifs = createComponent(($$result, $$props, $$slots) => {
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
	const tabs = [
		{
			id: "acces",
			label: "Accès"
		},
		{
			id: "logements",
			label: "Logements"
		},
		{
			id: "liste",
			label: "Liste de mariage"
		},
		{
			id: "legales",
			label: "Informations légales"
		},
		{
			id: "contact",
			label: "Nous contacter"
		}
	];
	return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {
		"title": `Préparatifs — ${site.name}`,
		"data-astro-cid-orbebzfo": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="page" data-astro-cid-orbebzfo><!-- Onglets --><div class="tabs-band" data-astro-cid-orbebzfo><nav class="tabs" aria-label="Préparatifs" data-astro-cid-orbebzfo><div class="tabs-hint" aria-hidden="true" data-astro-cid-orbebzfo>›</div>${tabs.map((tab) => renderTemplate`<button type="button" class="tab-btn"${addAttribute(tab.id, "data-tab")} aria-selected="false" data-astro-cid-orbebzfo>${tab.label}</button>`)}</nav></div><!-- Volet : Accès --><div class="tab-panel is-active" data-panel="acces" data-astro-cid-orbebzfo><section class="panel-section" data-astro-cid-orbebzfo><div class="page-header" data-astro-cid-orbebzfo><h1 class="reveal" data-astro-cid-orbebzfo>Accès</h1><div class="section-separator reveal-line" data-astro-cid-orbebzfo></div></div><div class="church reveal" data-astro-cid-orbebzfo><p class="church__name" data-astro-cid-orbebzfo>${church.name}</p><address class="church__address" data-astro-cid-orbebzfo>${churchAddress}</address><ul class="church__links" data-astro-cid-orbebzfo><li data-astro-cid-orbebzfo><a${addAttribute(churchDirectionsUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-orbebzfo>Ouvrir l'itinéraire</a></li><li data-astro-cid-orbebzfo><a${addAttribute(churchOsmUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-orbebzfo>Voir sur OpenStreetMap</a></li></ul></div>${renderComponent($$result, "VenueMap", $$VenueMap, {
		"lat": church.lat,
		"lon": church.lon,
		"zoom": church.zoom,
		"label": churchAddress,
		"data-astro-cid-orbebzfo": true
	})}</section><section class="panel-section" style="margin-top: 3rem;" data-astro-cid-orbebzfo><div class="venue reveal" data-astro-cid-orbebzfo><p class="venue__name" data-astro-cid-orbebzfo>${venue.name}</p><address class="venue__address" data-astro-cid-orbebzfo>${venueAddress}</address><p class="venue__parking" data-astro-cid-orbebzfo>Un parking est disponible dans l'enceinte du domaine</p><ul class="venue__links" data-astro-cid-orbebzfo><li data-astro-cid-orbebzfo><a${addAttribute(venueDirectionsUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-orbebzfo>Ouvrir l'itinéraire</a></li><li data-astro-cid-orbebzfo><a${addAttribute(venueOsmUrl, "href")} rel="noopener noreferrer" target="_blank" data-astro-cid-orbebzfo>Voir sur OpenStreetMap</a></li></ul></div>${renderComponent($$result, "VenueMap", $$VenueMap, {
		"lat": venue.lat,
		"lon": venue.lon,
		"zoom": venue.zoom,
		"label": venueAddress,
		"data-astro-cid-orbebzfo": true
	})}</section></div><!-- Volet : Logements --><div class="tab-panel" data-panel="logements" data-astro-cid-orbebzfo><section class="panel-section" data-astro-cid-orbebzfo><div class="page-header" data-astro-cid-orbebzfo><h1 class="reveal" data-astro-cid-orbebzfo>Logements</h1><div class="section-separator reveal-line" data-astro-cid-orbebzfo></div></div><p class="intro reveal" data-astro-cid-orbebzfo>Vous trouverez ci-dessous une liste de logements situés à proximité du lieu de réception.</p><div class="lodging-table reveal" data-astro-cid-orbebzfo><table data-astro-cid-orbebzfo><thead data-astro-cid-orbebzfo><tr data-astro-cid-orbebzfo><th data-astro-cid-orbebzfo>Établissement</th><th class="num" data-astro-cid-orbebzfo>Couchages</th><th data-astro-cid-orbebzfo>Distance</th><th data-astro-cid-orbebzfo>Répartition</th></tr></thead><tbody data-astro-cid-orbebzfo>${logements.map((l) => renderTemplate`<tr data-astro-cid-orbebzfo><td data-astro-cid-orbebzfo><a${addAttribute(l.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-orbebzfo>${l.name}<span class="arrow" data-astro-cid-orbebzfo>›</span></a></td><td class="num" data-astro-cid-orbebzfo>${l.couchages}</td><td data-astro-cid-orbebzfo>${l.distance}</td><td data-astro-cid-orbebzfo>${l.rep}</td></tr>`)}</tbody></table></div></section></div><!-- Volet : Liste de mariage --><div class="tab-panel" data-panel="liste" data-astro-cid-orbebzfo><section class="panel-section" data-astro-cid-orbebzfo><div class="page-header" data-astro-cid-orbebzfo><h1 class="reveal" data-astro-cid-orbebzfo>Liste de mariage</h1><div class="section-separator reveal-line" data-astro-cid-orbebzfo></div></div><p class="intro reveal" data-astro-cid-orbebzfo>Votre présence en cette belle journée sera le plus beau des cadeaux.</p><p class="intro reveal" data-astro-cid-orbebzfo>Pour celles et ceux qui souhaiteraient quand même nous faire un cadeau, vous pourrez contribuer à notre voyage de noces grâce à l'urne qui sera à votre disposition le jour du mariage.</p></section></div><!-- Volet : Informations légales --><div class="tab-panel" data-panel="legales" data-astro-cid-orbebzfo><section class="panel-section" data-astro-cid-orbebzfo><div class="page-header" data-astro-cid-orbebzfo><h1 class="reveal" data-astro-cid-orbebzfo>Informations légales</h1><div class="section-separator reveal-line" data-astro-cid-orbebzfo></div></div><p class="reveal" data-astro-cid-orbebzfo>Ce site est hébergé par Vercel Inc.<br data-astro-cid-orbebzfo>Les données collectées sont uniquement destinées à l'organisation du mariage et ne sont pas transmises à des tiers.</p></section></div><!-- Volet : Contact --><div class="tab-panel" data-panel="contact" data-astro-cid-orbebzfo><section class="panel-section" data-astro-cid-orbebzfo><div class="page-header" data-astro-cid-orbebzfo><h1 class="reveal" data-astro-cid-orbebzfo>Nous contacter</h1><div class="section-separator reveal-line" data-astro-cid-orbebzfo></div></div><p class="contact-name reveal" data-astro-cid-orbebzfo>${contact.name}</p><address class="contact-address reveal" data-astro-cid-orbebzfo>${contact.street}<br data-astro-cid-orbebzfo>${contact.postalCode} ${contact.city}<br data-astro-cid-orbebzfo>${contact.country}</address></section></div></section>` })}${renderScript($$result, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/preparatifs.astro";
var $$url = "/preparatifs";
// \0virtual:astro:page:src/pages/preparatifs@_@astro
var page = () => preparatifs_exports;
export { page };
