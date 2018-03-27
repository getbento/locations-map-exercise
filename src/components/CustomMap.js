import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import MapPopup from './MapPopup';

const defaultCenter = [38, -95]; // TODO update to auto calculate center based on locations

export default class CustomMap extends React.Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  }

  renderMarkers() {
    return this.props.locations.map(location => {
      const position = [location.lat, location.long];
      return (
        <Marker position={position} key={location.slug}>
          <Popup>
            <MapPopup data={location} onClick={this.props.onClick}/>
          </Popup>
        </Marker>
      );
    });
  }

  render() {
    return (
      <div>
        <LeafletMap center={defaultCenter} zoom={4}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.renderMarkers()}
        </LeafletMap>
      </div>
    );
  }
}
