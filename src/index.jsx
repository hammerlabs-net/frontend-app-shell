import '@babel/polyfill';

import * as React from 'react';
import ReactDOM from 'react-dom';

import { createInstance, Piral, SetComponent } from 'piral-core';

import {
  subscribe, initialize, APP_INIT_ERROR, APP_READY, mergeConfig,
} from '@edx/frontend-platform';
import { messages as headerMessages } from '@edx/frontend-component-header';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import { errors, ErrorInfo, Layout } from './layout';
import { availablePilets } from './pilets';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/empty';


subscribe(APP_READY, () => {
  const instance = createInstance({
    state: {
      errorComponents: errors,
      components: {
      } 
    },
    plugins: [],
    availablePilets
  });

  ReactDOM.render(
    <AppProvider>
      <Piral instance={instance} >
        <SetComponent name="Layout" component={Layout} />
        <SetComponent name="ErrorInfo" component={ErrorInfo} />
      </Piral>
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