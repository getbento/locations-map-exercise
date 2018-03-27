import Types from './types';
import { fetchLocations } from '../helpers/api';
import geoCodeService from '../services/geocode';
import { showLoader, hideLoader } from './loader';

export const getData = () => async (dispatch) => {
  try {
    dispatch(showLoader());
    const data = await fetchLocations();

    // Add latitude and longitude coordinates for each location
    let locations = await Promise.all(data.map(async (location, i) => {
      let result = await geoCodeService.get(location.address);
      location.lat = result.data.results[0].geometry.location.lat;
      location.long = result.data.results[0].geometry.location.lng;
      return new Promise((resolve) => resolve(location));
    }));

    dispatch({
      type: Types.map.SET_DATA,
      locations
    });

    dispatch(hideLoader());
  } catch (error) {
    dispatch({
      type: Types.map.ERROR,
      error
    });
    console.error(error);
    dispatch(hideLoader());
  }
};

export const setActiveLocation = (activeLocation) => ({
  type: Types.map.SET_ACTIVE_LOCATION,
  activeLocation
});
