import { LOCATIONS } from './constants';

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
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDZiardQQ0rYusEWeQlivZSxeJIpkOfrxM`;
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
