import { LOCATIONS } from './constants';
import { GOOGLE_API_KEY } from './google';
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function fetchLocations() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(LOCATIONS);
    }, getRandomInt(1250));
  });
}

export function getGeocode(address, successcallback, errorcallback) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch((error) => {
      Promise.reject(error);
    });
}
