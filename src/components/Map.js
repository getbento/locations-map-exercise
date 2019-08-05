import React, { createRef } from "react";
import styled from "styled-components";
import InfoWindow from "./InfoWindow";
import ExtendedInfo from "./ExtendedInfo";
import { render } from "react-dom";

const MapBox = styled.div`
  width: 800px;
  height: 600px;
  position: relative;
`;

const MapBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  z-index: 1000;
  height: 600px;
  width: 800px;
  background: rgba(10, 10, 10, 0.5);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

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
    extendedInfoDisplayed: false,
    currentItem: null,
    ipLocation: null
  };

  componentDidMount() {
    fetch("https://ipapi.co/json")
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          lat: response.latitude,
          lng: response.longitude
        });
      })
      .then(() => {
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
      });
  }
  intializeMap = () => {
    const { lat, lng } = this.state;
    this.setState({
      loading: false
    });
    const resultsMap = new google.maps.Map(this.mapBoxRef.current, {
      zoom: 2
    });
    setTimeout(() => {resultsMap.setZoom(6)}, 1000)
    resultsMap.panTo(new google.maps.LatLng(lat, lng));
    this.createMarkers(this.props.locations, resultsMap);
  };

  // Geocode OVER_QUERY_LIMIT error when processing more than 11 items
  // per minute. Instead of waiting a minute, here I call each one at an
  // interval of 500 milliseconds which seems to work (any less results
  // in the same error) plus it creates an animation
  createMarkers = (addressData, resultsMap) => {
    // there's some scope(?) issue inside of the Google functions where it
    // does not recognize the methods of the current React class as valid (maybe?).
    //  The below line looks weird but it seems to remedy it  ¯\_(ツ)_/¯
    let createInfoWindow = this.createInfoWindow;
    const geocoder = new google.maps.Geocoder();
    addressData.map(item => {
      setTimeout(() => {
        this.setState({
          markerCount: this.state.markerCount + 1
        });
        geocoder.geocode({ address: item.address }, function(results, status) {
          if (status == "OK") {
            const itemInfo = results[0].geometry;
            const marker = new google.maps.Marker({
              map: resultsMap,
              position: itemInfo.location,
              title: item.name
            });
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();
            marker.addListener("click", e => {
              {
                resultsMap.getZoom() < 8 && resultsMap.setZoom(8);
              }
              resultsMap.panTo(new google.maps.LatLng(lat, lng));
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

  createInfoWindow = (e, resultsMap, item) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.addListener("domready", e => {
      render(
        <InfoWindow item={item} toggleExtendedInfo={this.toggleExtendedInfo} />,
        document.getElementById("infoWindow")
      );
    });
    infoWindow.open(resultsMap);
  };

  toggleExtendedInfo = item => {
    this.setState({
      extendedInfoDisplayed: !this.state.extendedInfoDisplayed,
      currentItem: item
    });
  };

  mapBoxRef = createRef();
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <h2>LOADING MAP...</h2>
        ) : (
          <MapBoxWrapper>
            {this.state.markerCount !== this.props.locations.length && (
              <Overlay>
                <h1>Loading locations...</h1>
              </Overlay>
            )}
            {this.state.extendedInfoDisplayed && this.state.currentItem && (
              <Overlay>
                <ExtendedInfo
                  item={this.state.currentItem}
                  toggleExtendedInfo={this.toggleExtendedInfo}
                />
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
