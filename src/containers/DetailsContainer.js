import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../config/colors';

class DetailsContainer extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired
  }

  renderImages() {
    if (!this.props.map.activeLocation) return;
    return this.props.map.activeLocation.images.map((img, i) => {
      return (<Image src={img.url} alt={img.alt} key={i} />);
    });
  }

  render() {
    const location = this.props.map.activeLocation;

    if (!location) return <Container/>;
    return (
      <Container active={location}>
        <h1>Location Details</h1>
        <h3>{location.name}</h3>
        <p>{location.address}</p>
        {this.renderImages()}
        <div dangerouslySetInnerHTML={{__html: location.hours}}></div>
      </Container>
    );
  }
}

const Container = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  margin-top: ${props => (props.active ? '10px' : '100%')};
  transition: all 0.5s ease-in-out;
  border: 2px solid ${colors.white};
  padding: 10px;
`;
const Image = styled.img`
  height: 300px;
  width: auto;
  padding: 10px;
`;
function mapStateToProps(state) {
  const { map } = state;
  return { map };
}

export default connect(mapStateToProps)(DetailsContainer);
