import React, { createRef } from "react";
import styled from "styled-components";

const MapBox = styled.div`
  width: 800px
  height: 800px
`;

class Map extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    if (!window.google) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.google.com/maps/api/js?key=AIzaSyB9iEsdx1njWPrzPRLSQTF5TbCdWoQa0SM`;
      document.body.appendChild(googleMapsScript);

      googleMapsScript.addEventListener("load", e => {
        this.googleMap = this.geocodeAndInializeMap(this.props.locations);
      });
    } else {
      this.geocodeAndInializeMap(this.props.locations);
    }
  }

  // TO DO: Geocode OVER_QUERY_LIMIT error when results array is longer than 11 items
  geocodeAndInializeMap = addressData => {
    this.setState({
      loading: false
    });
    const resultsMap = new google.maps.Map(this.mapBoxRef.current, {
      center: { lat: 39.100273, lng: -94.588769 },
      zoom: 4
    });
    const geocoder = new google.maps.Geocoder();
    addressData.map(item => {
      geocoder.geocode({ address: item.address }, function(
        results,
        status
      ) {
        if (status == "OK") {
          new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };

  mapBoxRef = createRef();
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <h2>locations loading...</h2>
        ) : (
          <MapBox ref={this.mapBoxRef} />
        )}
      </React.Fragment>
    );
  }
}

export default Map;
