import axios from 'axios';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hicmVhZGx1eCIsImEiOiJjanR2bGp4c24xeWd3NDVuc2RtZXUyY204In0.QCOQD8hUh17MTB4KX3nPpA';

export async function fetchCoordinatesAndAddToLocationObjects(locations) {
  if (!locations || !locations.length) return locations;
  try {
    const promisesOfLocationsWithMapboxFeatures = locations.map(async location => {
      if (location.address) {
        const mapboxApiResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.address}.json?limit=1&&types=address&&access_token=${mapboxgl.accessToken}`);
        if (mapboxApiResponse && mapboxApiResponse.data && mapboxApiResponse.data.features) {
          return { locationData: location, mapboxFeature: mapboxApiResponse.data.features };
        }
      }
      return { locationData: location, mapboxFeature: [] };
    });
    const locationsWithMapboxFeatures = await Promise.all(promisesOfLocationsWithMapboxFeatures);
    return locationsWithMapboxFeatures;
  } catch (error) {
    console.error(error);
  }
}

export function constructMapboxPopup({ locationWithFeature, onClickFunction }) {
  const popupEl = document.createElement('div');
  const popupName = document.createElement('h3');
  popupName.innerText = `${locationWithFeature.locationData.name}`;
  const popupAddress = document.createElement('p');
  popupAddress.innerText = `${locationWithFeature.locationData.address}`;
  const popupButton = document.createElement('button');
  popupButton.innerText = 'View Details';
  popupButton.addEventListener('click', () => onClickFunction(locationWithFeature));
  popupEl.appendChild(popupName);
  popupEl.appendChild(popupAddress);
  popupEl.appendChild(popupButton);
  const popup = new mapboxgl.Popup()
    .setDOMContent(popupEl);
  return popup;
}

export function constructMapboxMarker() {
  const el = document.createElement('div');
  el.className = 'marker';
  return new mapboxgl.Marker(el);
}
