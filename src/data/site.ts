export const site = {
	name: "Tiffany et Charles",
	/** Name split per line for the landing hero heading. */
	nameLines: ["Tiffany", "Charles"],
	date: "Samedi 29 mai 2027",
	subtitle: "Nous allons nous marier !",
} as const;

export interface NavItem {
	label: string;
	href: string;
}

/**
 * Central navigation source. Every page renders its links from this list so
 * adding/renaming a route happens in exactly one place.
 */
export const navItems: readonly NavItem[] = [
	{ label: "Programme", href: "/le-mariage" },
	{ label: "Accès", href: "/itineraire" },
	{ label: "Nous contacter", href: "/contact" },
	{ label: "Informations légales", href: "/legad" },
	{ label: "Logements", href: "/logement" },
];
