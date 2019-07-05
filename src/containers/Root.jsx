import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from './App';
import DevTools from './DevTools';

import { GLOBALCONST } from '../AppContext';

const preloadedState = {
  generalReducer: GLOBALCONST.PRELOADED_STATE
};

const Root = () => {
  return (
    <Provider store={configureStore(preloadedState)}>
      <App />
      <div id="portal" />
      <DevTools />
    </Provider>
  );
};

export default Root;
