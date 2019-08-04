import React, { createRef } from "react";
import styled from "styled-components";

const MapBox = styled.div`
  width: 800px;
  height: 600px;
  z-index: -1;
  position: relative;
`;

const MapBoxWrapper = styled.div`

`

const Overlay = styled.div`
  z-index: 1000;
  height: 600px;
  width: 800px;
  background: rgba(10,10,10,0.5);
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
    markerCount: 0
  };

  componentDidMount() {
    if (!window.google) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.google.com/maps/api/js?key=AIzaSyB9iEsdx1njWPrzPRLSQTF5TbCdWoQa0SM`;
      document.body.appendChild(googleMapsScript);
      googleMapsScript.addEventListener("load", e => {
        this.inializeMap();
      });
    } else {
      this.inializeMap();
    }
  }
  inializeMap = () => {
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
    let number = 0;
    const geocoder = new google.maps.Geocoder();
    addressData.map(item => {
      setTimeout(() => {
        this.setState({
          markerCount: this.state.markerCount + 1
        });
        geocoder.geocode({ address: item.address }, function(results, status) {
          if (status == "OK") {
            new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
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

  mapBoxRef = createRef();
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <h2>locations loading...</h2>
        ) : (
          <MapBoxWrapper>
            {this.state.markerCount !== this.props.locations.length && (
              <Overlay><h1>Loading locations...</h1></Overlay>
            )}
            <MapBox ref={this.mapBoxRef} />
          </MapBoxWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default Map;
