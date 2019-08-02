import React, { createRef } from "react";
import styled from "styled-components";

const MapBox = styled.div`
  width: 200px;
  background: yellow;
`;

class Map extends React.Component {
  mapBoxRef = createRef();
  render() {
    return <MapBox ref={this.mapBoxRef}>Map Goes Here</MapBox>;
  }
}

export default Map;
