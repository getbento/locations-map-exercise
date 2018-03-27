import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../actions';
import CustomMap from '../components/CustomMap';

class MapContainer extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    loader: PropTypes.object.isRequired,
    getData: PropTypes.func.isRequired,
    setActiveLocation: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getData();
  }

  showDetails(location) {
    this.props.setActiveLocation(location);
  }

  render() {
    const { locations } = this.props.map;

    return (
      (locations.length && !this.props.loader.active)
        ? <CustomMap locations={locations} onClick={(location) => this.showDetails(location)}/> : null
    );
  }
}

function mapStateToProps(state) {
  const { map, loader } = state;
  return { map, loader };
}

export default connect(mapStateToProps, Actions)(MapContainer);
