import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../config/colors';

export default class MapPopup extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const location = this.props.data;
    return (
      <Container>
        <Title>{location.name}</Title>
        <Address>{location.address}</Address>
        <Button onClick={() => this.props.onClick(location)}>View Details</Button>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 200px;
  width: 100px;
  color:  ${colors.navy};
`;

const Title = styled.h3`
  font-size: 1.2 rem;
`;

const Address = styled.p`
  font-size: 1 rem;
`;

const Button = styled.button`
  background-color:  ${colors.white};
  padding: 5px 10px;
  border: 1px solid  ${colors.navy};
  color:  ${colors.navy};
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px #CCC;
  }
`;
