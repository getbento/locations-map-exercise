import React from "react";
import PropTypes from "prop-types";
import "../styles/app.css";
import styled from "styled-components";

import { fetchLocations } from "../helpers/api";
import Map from "../components/Map";

const Title = styled.h1`
  font-weight: 300;
`;

const FlexContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const MapBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class App extends React.Component {
  state = {
    locations: []
  };

  componentDidMount() {
    fetchLocations()
      .then(response =>
        this.setState({
          locations: response
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    return (
      <FlexContainer>
        <MapBox>
          <Title>Find Bento Box Restaurants Near You</Title>
          {this.state.locations && this.state.locations.length ? (
            <Map locations={this.state.locations} />
          ) : (
            <h2>LOADING MAP....</h2>
          )}
        </MapBox>
      </FlexContainer>
    );
  }
}

export default App;
