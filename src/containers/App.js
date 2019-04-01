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
      showFullDetails: false,
      selectionHistory: [],
      selectionHistoryPointer: -1
    };
    this.closeDetails = this.closeDetails.bind(this);
    this.selectToViewDetails = this.selectToViewDetails.bind(this);
    this.navigateSelectionHistory = this.navigateSelectionHistory.bind(this);
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
      const popup = constructMapboxPopup({ locationWithFeature, onClickFunction: this.selectToViewDetails });
      const marker = constructMapboxMarker();
      marker.setPopup(popup)
        .setLngLat(locationWithFeature.mapboxFeature[0].center)
        .addTo(this.map);
    });
  }

  selectToViewDetails(locationWithFeature) {
    let { selectionHistory, selectionHistoryPointer } = this.state;
    selectionHistory.push(locationWithFeature);
    selectionHistoryPointer = selectionHistory.length - 1;
    this.setState({ showFullDetails: true, selectionHistory, selectionHistoryPointer });
  }

  closeDetails() {
    this.setState({ showFullDetails: false });
  }

  navigateSelectionHistory(num) {
    let { selectionHistory, selectionHistoryPointer } = this.state;
    if ((num > 0 && selectionHistoryPointer + num < selectionHistory.length) ||
    (num < 0 && selectionHistoryPointer + num >= 0)) {
      this.setState({ selectionHistoryPointer: selectionHistoryPointer + num });
    }
  }

  render() {
    const { selectionHistory, selectionHistoryPointer } = this.state;
    const locationWithFeature = selectionHistory[selectionHistoryPointer];
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0px', padding: '0px', display: 'flex', flex: 1 }}>
        {this.state.loading
          ? <h1 style={{ position: 'absolute', zIndex: '100', padding: '10px' }}>Loading locations...</h1>
          : null
        }
        <div ref={el => { this.mapContainer = el; }} style={{ flex: 1, margin: '0px', padding: '0px' }} />
        {this.state.showFullDetails
          ? <FullDetails
            closeDetails={this.closeDetails}
            selectionHistory={selectionHistory}
            locationData={locationWithFeature.locationData}
            selectionHistoryPointer={selectionHistoryPointer}
            navigateSelectionHistory={this.navigateSelectionHistory} />
          : null
        }
      </div>
    );
  }
}

export default App;
