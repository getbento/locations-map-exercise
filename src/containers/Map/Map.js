'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './map.css';
import { fetchLocations, getGeocode } from '../../helpers/api';
import { GOOGLE_API_KEY } from '../../helpers/google';

import Modal from '../Modal/Modal';
import Detail from '../Detail/Detail';

class Map extends Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.state = {
      locations: [],
      coordinates: [],
      isLoading: true,
      viewDetail: false
    };
  }

  // Life cycle method handles data retrieval before map rendering
  componentDidMount() {
    fetchLocations()
      .then(response => {
        let promises = [];
        response.forEach((location, index) => {
          promises.push(getGeocode(location.address));
        });

        // Wait until all geocode has been successfully retrieved then render map
        Promise.all(promises)
          .then(data => {
            let coordinates = [];
            data.forEach((geocode, index) => {
              coordinates.push(geocode.results[0].geometry.location);
            });

            this.setState(
              {locations: response, coordinates, isLoading: false}, this.renderMap());
          });
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Loads the google maps javascript and execute the initmap callback
   */
  renderMap() {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }

  setMapMarker(coordinates, map) {
    const marker = new window.google.maps.Marker({
      map: map,
      position: coordinates
    });

    return marker;
  }

  /**
   * Google map callback responsible for rendering the map
   * 1) renders the map on screen
   * 2) place markers on the coordinates
   * 3) set a info window that can be displayed on click
   */
  initMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7166638, lng: -74.0},
      zoom: 6
    });

    let infoWindow = new window.google.maps.InfoWindow({});

    if (this.state.coordinates.length > 0) {
      this.state.coordinates.forEach((coordinate, index) => {
        let marker = this.setMapMarker(coordinate, map);

        marker.addListener('click', (event) => {
          infoWindow.setContent(this.getInfowWindowContent(index));
          infoWindow.open(map, marker);
        });
      });
    }

    this.renderViewDetailsListener(map, infoWindow);
  }

  /**
   * create event listener for view details button element once dom string is ready
   * @param {*} map
   * @param {*} infoWindow
   */
  renderViewDetailsListener(map, infoWindow) {
    window.google.maps.event.addListener(infoWindow, 'domready', () => {
      document.getElementById('viewDetails').addEventListener('click', (event) => {
        let index = event.target.getAttribute('data-index');
        this.setState({viewDetail: true, detailIndex: index});
      });
    });
  }

  /**
   * Return a content string for the google maps info window base
   * on the marker clicked
   * @param {} index of locations array to access
   */
  getInfowWindowContent(index) {
    let name = this.state.locations[index].name;
    let address = this.state.locations[index].address;
    return `<div>${name}</div>
            <div>${address}</div>
            <button id="viewDetails" data-index=${index}>View Details</button>`;
  }

  /**
   * callback for modal component to close the modal
   */
  hideDetail() {
    this.setState({viewDetail: false});
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading
            ? <div className={styles.loadingMsg}>Loading Map...</div>
            : <div id="map"></div>
        }
        {
          this.state.viewDetail
            ? <Modal hideDetail={this.hideDetail}>
              <Detail info={this.state.locations[this.state.detailIndex]}/>
            </Modal>
            : null
        }
      </div>
    );
  }
}

/**
 * Helper method to generate the script tag to be generated
 * in index.html
 * @param {} url google api url
 */
function loadScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

Map.propTypes = {
  locations: PropTypes.array
};

export default Map;
