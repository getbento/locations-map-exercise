import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from '../containers/App';

/* eslint react/display-name: 0 */
export default () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);
