import '@babel/polyfill';

// React
import * as React from 'react';
import ReactDOM from 'react-dom';

// PIral
import { createInstance, Piral } from 'piral-core';
import { createLayoutApi } from './api/layout';

// OpenEdx
import { subscribe, initialize, APP_READY, mergeConfig, } from '@edx/frontend-platform';
import { messages as headerMessages } from '@edx/frontend-component-header';
import { AppProvider } from '@edx/frontend-platform/react';

import { availablePilets, reducers, sagas } from './pilets';
import configureStore from './data/configureStore';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/empty';


subscribe(APP_READY, () => {
  const instance = createInstance({
    state: {
      errorComponents: {},
      components: {} 
    },
    plugins: [
      createLayoutApi(), 
    ],
    availablePilets
  });

  ReactDOM.render(
    <AppProvider store={configureStore({}, reducers, sagas)}>
      <Piral instance={instance} />
    </AppProvider>,
    document.querySelector('#app')
  );
});

initialize({
  messages: [
    headerMessages,
  ],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        CUSTOM_VARIABLE: process.env.CUSTOM_VARIABLE || null,
      }, 'Custom app config');
    },
  },

});