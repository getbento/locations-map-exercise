import React from 'react';
import mapboxgl from 'mapbox-gl';
import FullDetails from './FullDetails';
import { fetchLocations } from '../helpers/api';
import { fetchCoordinatesAndAddToLocationObjects, constructMapboxPopup, constructMapboxMarker } from '../helpers/mapbox';
import { STARTING_LONGITUDE, STARTING_LATITUDE, STARTING_ZOOM } from '../helpers/constants';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hicmVhZGx1eCIsImEiOiJjanR2bGp4c24xeWd3NDVuc2RtZXUyY204In0.QCOQD8hUh17MTB4KX3nPpA';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lng: STARTING_LONGITUDE,
      lat: STARTING_LATITUDE,
      zoom: STARTING_ZOOM,
      selectedLocation: null
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }

  componentDidMount() {
    this.instantiateMap();
    this.fetchAndDisplayLocations();
  }

  instantiateMap() {
    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  async fetchAndDisplayLocations() {
    try {
      const locations = await fetchLocations();
      const locationsWithMapboxFeatures = await fetchCoordinatesAndAddToLocationObjects(locations);
      this.createPopupsAndMarkersAndAddToMap(locationsWithMapboxFeatures);
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  createPopupsAndMarkersAndAddToMap(locationsWithFeatues) {
    locationsWithFeatues.forEach(locationWithFeature => {
      const popup = constructMapboxPopup({ locationWithFeature, onClickFunction: this.showDetails });
      const marker = constructMapboxMarker();
      marker.setPopup(popup)
        .setLngLat(locationWithFeature.mapboxFeature[0].center)
        .addTo(this.map);
    });
  }

  showDetails(locationWithFeature) {
    this.setState({ selectedLocation: locationWithFeature });
  }

  closeDetails() {
    this.setState({ selectedLocation: null });
  }

  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px', display: 'flex', flex: 1 }}>
        {this.state.loading
          ? <h1 style={{ position: 'absolute', zIndex: '100', padding: '10px' }}>Loading locations...</h1>
          : null
        }
        <div ref={el => { this.mapContainer = el; }} style={{ flex: 1, margin: '0px', padding: '0px' }} />
        {this.state.selectedLocation
          ? <FullDetails
            closeDetails={this.closeDetails}
            locationData={this.state.selectedLocation.locationData} />
          : null
        }
      </div>
    );
  }
}

export default App;
