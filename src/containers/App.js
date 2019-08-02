import React from "react";
import PropTypes from "prop-types";

import { fetchLocations } from "../helpers/api";
import Map from "../components/Map";

class App extends React.Component {
  componentDidMount() {
    fetchLocations()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Locations Map Exercise!</h1>
        <Map />
      </React.Fragment>
    );
  }
}

export default App;
