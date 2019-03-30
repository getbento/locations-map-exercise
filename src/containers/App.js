import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

import { fetchLocations } from '../helpers/api';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hicmVhZGx1eCIsImEiOiJjanR2bGp4c24xeWd3NDVuc2RtZXUyY204In0.QCOQD8hUh17MTB4KX3nPpA';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lng: -100,
      lat: 39,
      zoom: 2.5,
      selectedLocation: null
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    this.tooltipContainer = document.createElement('div');

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0, 0]).addTo(this.map);

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });

    fetchLocations()
      .then(locations => this.fetchCoordinatesAndAddToLocationObjects(locations))
      .then(locationsWithMapboxFeatures => this.createMarkers(locationsWithMapboxFeatures))
      .catch(error => console.log(error));
  }

  // setTooltip(location) {
  //   ReactDOM.render(
  //     React.createElement(
  //       Tooltip, {
  //         features
  //       }
  //     ),
  //     this.tooltipContainer
  //   );
  // }

  createMarkers(locationsWithFeatues) {
    locationsWithFeatues.forEach(locationWithFeature => {
      const popupEl = document.createElement('div');
      popupEl.innerHTML = 'Hello World';
      const popup = new mapboxgl.Popup()
        .setDOMContent(popupEl);
      const el = document.createElement('div');
      // el.addEventListener('click', () => this.setTooltip(locationWithFeature));
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setPopup(popup)
        .setLngLat(locationWithFeature.mapboxFeature[0].center)
        .addTo(this.map);
    });
  }

  async fetchCoordinatesAndAddToLocationObjects(locations) {
    const promisesOfLocationsWithMapboxFeatures = locations.map(async location => {
      const mapboxApiResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.address}.json?limit=1&&types=address&&access_token=${mapboxgl.accessToken}`);
      return { locationData: location, mapboxFeature: mapboxApiResponse.data.features };
    });
    const locationsWithMapboxFeatures = await Promise.all(promisesOfLocationsWithMapboxFeatures);
    return locationsWithMapboxFeatures;
  }

  render() {
    console.log('this.state:', this.state);
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px' }}>
        {this.state.loading
          ? <h1 style={{ position: 'absolute', zIndex: '100' }}>Loading...</h1>
          : null
        }
        <div ref={el => { this.mapContainer = el; }} style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px' }} />
      </div>
    );
  }
}

export default App;
