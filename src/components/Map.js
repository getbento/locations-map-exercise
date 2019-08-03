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
        console.log("IT LOADED!!!", window.google);
        this.initializeMap();
      });
    } else {
      this.setState({
        loading: false
      });
      this.initializeMap();
    }
  }

  initializeMap = () => {
    this.setState({
      loading: false
    });
    console.log("got to initialize map");
    new google.maps.Map(this.mapBoxRef.current, {
      center: { lat: 40.6794, lng: -74.0014 },
      zoom: 12
    });
  };

  mapBoxRef = createRef();
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <h2>loading...</h2>
        ) : (
          <MapBox ref={this.mapBoxRef}>Map Goes Here</MapBox>
        )}
      </React.Fragment>
    );
  }
}

export default Map;
