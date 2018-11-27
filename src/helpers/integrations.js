import axios from 'axios'

export async function convertAddressToLatLng(location) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
	const res = await axios.get(url);
	const locationData = res.data.results[0].geometry.location;
	location['latitude'] = locationData.lat
	location['longitude'] = locationData.lng;;
}
