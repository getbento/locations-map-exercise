import React from 'react';

import MapContainer from './Map';
import Sidebar from './Sidebar';
import { fetchLocations } from '../helpers/api';
import { convertAddressToLatLng } from '../helpers/integrations';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {}
	}

  componentDidMount() {
  	const locations = [];
    fetchLocations()
      .then(async response => { 
      	for (let l of response) {
      		await convertAddressToLatLng(l)
      		.then(() => {
      			locations.push(l)
      		})
      		.catch(error => console.log(error))
      	}
      })
      .then(() => this.setState({locations: locations}))
      .catch(error => console.log(error))
  }

  openSidebar(locationData) {
    this.setState({sidebarData: locationData});
  }

  closeSidebar() {
    this.setState({sidebarData: null});
  }

  render() {
    const { sidebarData, locations } = this.state
  	if (locations) {
  		return (
        <div>
          {sidebarData && <Sidebar {...sidebarData} />}
          <MapContainer 
            locations={locations} 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{height: '100%'}} />}
            containerElement={<div style={{height: '100vh'}}/>}
            mapElement={<div style={{ height: '100%'}}/>}
            openSidebar={this.openSidebar.bind(this)}
            closeSidebar={this.closeSidebar.bind(this)}
          />
        </div>
      )
  	}
    return (
    	<div>Loading...</div>
    )
  }
}

export default App;
