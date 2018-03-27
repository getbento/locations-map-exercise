import { injectGlobal } from 'styled-components';
import colors from '../config/colors';

injectGlobal`
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${colors.maroon};
    color: ${colors.white};
  }
  a {
    color: ${colors.white};
  }
  .leaflet-container {
    height: 600px;
    width: 100%;
  }
`;
