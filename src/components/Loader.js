import React from 'react';
import styled from 'styled-components';
import { ScaleLoader } from 'halogenium';
import colors from '../config/colors';

export default class Loader extends React.Component {
  render = () => (
    <Container>
      <ScaleLoader color={colors.white} size="2rem" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.4);
`;
