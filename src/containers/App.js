import React from 'react';
import Map from './Map/Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  render() {
    return (
      <div>
        {/* <h1>Locations Map Exercise!</h1> */}
        <Map />
      </div>
    );
  }
}

export default App;
