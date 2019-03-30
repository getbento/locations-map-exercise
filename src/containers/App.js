import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import { fetchLocations } from '../helpers/api';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlc2hicmVhZGx1eCIsImEiOiJjanR2bGp4c24xeWd3NDVuc2RtZXUyY204In0.QCOQD8hUh17MTB4KX3nPpA';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      locations: null
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    fetchLocations()
      .then(response => this.setState({ locations: response }))
      .catch(error => console.log(error));
  }

  async getCoordinatesFromAddresses() {
    const { locations } = this.state;
    const promisesOfLocationsWithCoordinates = locations.map(locaiton => {

    })
  }

  render() {
    console.log('this.state:', this.state)
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px' }}>
        <div ref={el => { this.mapContainer = el; }} style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px' }} />
      </div>
    );
  }
}

export default App;
