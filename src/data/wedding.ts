export const venue = {
	name: "Château du Chesnay-Haguest",
	street: "Le Chesnay",
	postalCode: "27630",
	city: "Vexin-sur-Epte",
	country: "France",
	// Coordinates are the village centre fallback: the exact building is not
	// mapped in OpenStreetMap yet. Confirm with the venue and update these two.
	lat: 49.172339,
	lon: 1.6016258,
	zoom: 16,
} as const;

export const venueAddress = [
	venue.street,
	`${venue.postalCode} ${venue.city}`,
	venue.country,
].join(", ");

export const venueOsmUrl = `https://www.openstreetmap.org/?mlat=${venue.lat}&mlon=${venue.lon}#map=${venue.zoom}/${venue.lat}/${venue.lon}`;

export const venueDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;
