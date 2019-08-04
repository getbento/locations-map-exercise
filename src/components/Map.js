import React, { createRef } from "react";
import styled from "styled-components";
import InfoWindow from './InfoWindow'
import {render} from 'react-dom';

const MapBox = styled.div`
  width: 800px;
  height: 600px;
  position: relative;
`;

const MapBoxWrapper = styled.div``;

const Overlay = styled.div`
  z-index: 1000;
  height: 600px;
  width: 800px;
  background: rgba(10, 10, 10, 0.5);
  position: absolute;
  display: flex;
  align-items: center;

  & h1 {
    margin: auto;
    color: white;
    font-weight: 400;
  }
`;

class Map extends React.Component {
  state = {
    loading: true,
    markerCount: 0,
    currentItem: 'bob'
  };

  componentDidMount() {
    if (!window.google) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.google.com/maps/api/js?key=AIzaSyB9iEsdx1njWPrzPRLSQTF5TbCdWoQa0SM`;
      document.body.appendChild(googleMapsScript);
      googleMapsScript.addEventListener("load", e => {
        this.intializeMap();
      });
    } else {
      this.intializeMap();
    }
  }
  intializeMap = () => {
    this.setState({
      loading: false
    });
    const resultsMap = new google.maps.Map(this.mapBoxRef.current, {
      center: { lat: 39.100273, lng: -94.588769 },
      zoom: 4
    });
    this.createMarkers(this.props.locations, resultsMap);
  };

  // Geocode OVER_QUERY_LIMIT error when processing more than 11 items
  // per minute. Instead of waiting a minute, here I call each one at an
  // interval of 500 milliseconds which seems to work smoothly
  createMarkers = (addressData, resultsMap) => {
    // there's some scope(?) issue inside of the Google functions where it
    // does not recognize the methods of the current React class as valid. The below
    // line looks weird but it seems to remedy it  ¯\_(ツ)_/¯
    let createInfoWindow = this.createInfoWindow;
    const geocoder = new google.maps.Geocoder();
    addressData.map(item => {
      setTimeout(() => {
        this.setState({
          markerCount: this.state.markerCount + 1
        });
        geocoder.geocode({ address: item.address }, function(results, status) {
          if (status == "OK") {
            const marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: item.name
            });
            marker.addListener("click", e => {
              createInfoWindow(e, resultsMap, item);
            });
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      }, addressData.indexOf(item) * 500);
    });
  };
// this comes basically straight out of here https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
  createInfoWindow = (e, resultsMap, item) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.addListener('domready', e => {
      render(<InfoWindow item={item} showExtendedInfo={this.showExtendedInfo}/>, document.getElementById('infoWindow'))
    })
    infoWindow.open(resultsMap)
  };

  showExtendedInfo = (item) => {
  console.log('got to show extended info', item)
}

  mapBoxRef = createRef();
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <h2>locations loading...</h2>
        ) : (
          <MapBoxWrapper>
            {this.state.markerCount !== this.props.locations.length && (
              <Overlay>
                <h1>Loading locations...</h1>
              </Overlay>
            )}
            <MapBox ref={this.mapBoxRef} />
          </MapBoxWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default Map;
