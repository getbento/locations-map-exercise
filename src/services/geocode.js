import axios from 'axios';
import googleMapsApiKey from '../config/googleMapsApiKey';

const geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

const geoCodeService = {
  get: async (address) => axios.get(`${geoCodeUrl}?address=${address}&key=${googleMapsApiKey}`)
};

export default geoCodeService;
