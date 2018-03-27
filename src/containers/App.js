import React from 'react';
import MapContainer from '../containers/MapContainer';
import DetailsContainer from '../containers/DetailsContainer';
import LoaderContainer from '../containers/LoaderContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <MapContainer />
        <DetailsContainer />
        <LoaderContainer />
      </div>
    );
  }
}

export default App;
