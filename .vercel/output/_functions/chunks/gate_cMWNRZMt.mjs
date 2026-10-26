import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { F as addAttribute, M as renderTemplate, P as renderHead } from "./sequence_DKkBVb9G.mjs";
import { T as isActionError } from "./server_jmpw4w3n.mjs";
import { n as createComponent, t as createAstro } from "./compiler_B21378Bx.mjs";
import { t as actions } from "./_astro_actions_CpJCHj5k.mjs";
import { n as site } from "./site_KPf2B4Rz.mjs";
// src/pages/gate.astro
var gate_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gate,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Gate = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gate;
	if (Astro.locals.group) return Astro.redirect("/");
	const result = Astro.getActionResult(actions.login);
	if (result && !result.error) return Astro.redirect("/");
	const errorMessage = result?.error && isActionError(result.error) ? result.error.message : null;
	return renderTemplate`<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${site.name}</title><style>
			@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Great+Vibes&display=swap');
			:root {
				--color-cream: #F8F2E8;
				--color-ink: #5C4A3D;
				--color-navy: #2D4A6F;
				--color-slate-blue: #6B8CAE;
				--color-muted: #7a6b5f;
			}
			* { box-sizing: border-box; }
			body {
				margin: 0;
				min-height: 100dvh;
				display: flex;
				align-items: center;
				justify-content: center;
				background: var(--color-cream);
				color: var(--color-ink);
				font-family: 'Bodoni Moda', Georgia, serif;
				line-height: 1.6;
				padding: 1.5rem;
			}
			.gate-card {
				width: 100%;
				max-width: 380px;
				text-align: center;
			}
			.gate-card h1 {
				margin: 0 0 0.25rem;
				font-size: clamp(1.75rem, 5vw, 2.25rem);
				font-weight: 400;
				font-style: italic;
				color: var(--color-navy);
				font-family: 'Bodoni Moda', Georgia, serif;
			}
			.gate-subtitle {
				margin: 0 0 1.5rem;
				font-size: 1.05rem;
				color: var(--color-muted);
			}
			.gate-hint {
				margin: 0 0 1.25rem;
				font-size: 0.95rem;
				color: var(--color-muted);
				line-height: 1.5;
			}
			.gate form {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
			}
			.gate input {
				width: 100%;
				padding: 0.75rem 1rem;
				font-size: 1rem;
				border: 1px solid rgba(93, 74, 61, 0.2);
				border-radius: 0.35rem;
				background: #fff;
				color: var(--color-ink);
				font-family: 'Bodoni Moda', Georgia, serif;
			}
			.gate input:focus {
				outline: 2px solid var(--color-slate-blue);
				outline-offset: 2px;
				border-color: var(--color-slate-blue);
			}
			.gate button {
				padding: 0.75rem 1.5rem;
				font-size: 1rem;
				background: var(--color-slate-blue);
				color: #fff;
				border: none;
				border-radius: 0.35rem;
				cursor: pointer;
				font-family: 'Bodoni Moda', Georgia, serif;
				transition: background 150ms ease;
			}
			.gate button:hover {
				background: var(--color-navy);
			}
			.gate-error {
				margin: 0;
				font-size: 0.85rem;
				color: #c0392b;
			}
			.sr-only {
				position: absolute;
				width: 1px; height: 1px;
				padding: 0; margin: -1px;
				overflow: hidden; clip: rect(0, 0, 0, 0);
				white-space: nowrap; border-width: 0;
			}
		</style>${renderHead($$result)}</head><body><div class="gate-card gate"><h1>${site.name}</h1><p class="gate-subtitle">Bienvenue sur notre site de mariage !</p><p class="gate-hint">Entrez le code d'accès reçu avec votre invitation pour accéder au site.</p><form method="post"${addAttribute(actions.login, "action")} autocomplete="off"><label for="accessCode" class="sr-only">Code d'accès</label><input type="text" id="accessCode" name="accessCode" placeholder="Votre code d'accès" autocapitalize="characters" autofocus required>${errorMessage && renderTemplate`<p class="gate-error">${errorMessage}</p>`}<button type="submit">Entrer</button></form></div></body></html>`;
}, "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/gate.astro", void 0);
var $$file = "C:/Users/Charles Labelle/OneDrive/Documents/Mariage/src/pages/gate.astro";
var $$url = "/gate";
// \0virtual:astro:page:src/pages/gate@_@astro
var page = () => gate_exports;
export { page };
