import React from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
import Router from './config/router';

const App = () => (
  <Provider store={store}>
    <div id="app">
      <Router />
    </div>
  </Provider>
);

export default App;
