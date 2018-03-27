import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../actions';
import Loader from '../components/Loader';

class LoaderScreen extends React.Component {
  static propTypes = {
    loader: PropTypes.object.isRequired
  }

  render() {
    return (
      <Fragment>
        {this.props.loader.active && <Loader />}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { loader: state.loader };
}

export default connect(mapStateToProps, Actions)(LoaderScreen);
