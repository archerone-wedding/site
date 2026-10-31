// src/data/wedding.ts
var venue = {
	name: "Château du Chesnay-Haguest",
	street: "4 hameau du Chesnay",
	postalCode: "27630",
	city: "Vexin-sur-Epte",
	country: "France",
	lat: 49.172339,
	lon: 1.6016258,
	zoom: 16
};
var venueAddress = [
	venue.street,
	`${venue.postalCode} ${venue.city}`,
	venue.country
].join(", ");
var venueOsmUrl = `https://www.openstreetmap.org/?mlat=${venue.lat}&mlon=${venue.lon}#map=${venue.zoom}/${venue.lat}/${venue.lon}`;
var venueDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;
var church = {
	name: "Église Notre-Dame de Tourny",
	street: "1 rue Aval",
	postalCode: "27510",
	city: "Vexin-sur-Epte",
	country: "France",
	lat: 49.2092933,
	lon: 1.5683631,
	zoom: 17
};
var churchAddress = [
	church.street,
	`${church.postalCode} ${church.city}`,
	church.country
].join(", ");
var churchOsmUrl = `https://www.openstreetmap.org/?mlat=${church.lat}&mlon=${church.lon}#map=${church.zoom}/${church.lat}/${church.lon}`;
var churchDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchAddress)}`;
var contact = {
	name: "Tiffany Harvel et Charles Labelle",
	street: "87 rue de Billancourt",
	postalCode: "92100",
	city: "Boulogne-Billancourt",
	country: "France"
};
export { contact as a, venueDirectionsUrl as c, churchOsmUrl as i, venueOsmUrl as l, churchAddress as n, venue as o, churchDirectionsUrl as r, venueAddress as s, church as t };
