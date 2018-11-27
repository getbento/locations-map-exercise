import React from 'react';
import ReactDOM from 'react-dom';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import InfoWindowDisplay from './InfoWindow';

class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	renderInfoWindow(l) {
		this.setState({infoWindowData: l});
	}
	closeInfoWindow() {
		this.setState({infoWindowData: null});
		this.props.closeSidebar()
	}

	render() {
		const { locations, openSidebar } = this.props;
		const { infoWindowData } = this.state
		return (
			<GoogleMap
				defaultZoom={4}
				defaultCenter={{lat: 39.8283, lng: -98.5795}}
			>
				{locations.map(l => (
					<Marker 
						position={{lat: l.latitude, lng: l.longitude}}
						onClick={(e) => this.renderInfoWindow(l)}
					/>
				))}
				{infoWindowData && 
					<InfoWindow
						style={{margin:30}}
						onCloseClick={this.closeInfoWindow.bind(this)}
						position={{lat: infoWindowData.latitude, lng: infoWindowData.longitude}}
						options={{pixelOffset: new google.maps.Size(0, -25)}}
					>
						<InfoWindowDisplay viewDetails={openSidebar} {...infoWindowData} />	
					</InfoWindow>
				}
			</GoogleMap>
		)
	}
}

export default withScriptjs(withGoogleMap(MapContainer));
