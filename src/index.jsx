// React
import * as React from 'react';
import ReactDOM from 'react-dom';

// Piral
import { createInstance, Piral } from 'piral-core';
import { createLayoutApi, createPlatformApi } from './api';

// OpenEdx
import { subscribe, initialize, APP_READY, APP_INIT_ERROR, } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

// Pilets
import { pilets as availablePilets } from './pilets';
//import  PiralProvider  from './PiralProvider';

// Redux
import { applyMiddleware } from 'redux';
import { createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createLogger } from 'redux-logger';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
const messages = {
  'en': {
    "embed.head": 'Welcome!',
    "embed.content": 'This page demonstrates how to routes can be defined for the piral instance itself.',
  },
};

const Page = () => {
  return (
    <>
      <h1><FormattedMessage id='embed.head' /></h1>
      <p>
        <FormattedMessage id='embed.content' />
      </p>
    </>
  );
};

// Open edX APP_READY handler. 
subscribe(APP_READY, () => {
  /* Configure Redux
   *
   * In exisitng MFEs the Redux store is configured at creation time as the 
   * reducers and sagas are known to the application before hand. In the Piral
   * context, the shell is not aware of what reducers and sagas must be loaded.
   * To support this, this POC uses Reduc Dynamic Modules in order to load 
   * reducers and sagas when pilets's are loaded into the shell.
   */
    const loggerMiddleware =  composeWithDevTools(applyMiddleware(createLogger({
      collapsed: true,
    })));
  
    const store =  createStore({
      extensions: [
        getSagaExtension(),
        getThunkExtension(),
      ],
      loggerMiddleware,
    });
  
  /* Create The Piral instance.
   * 
   * We use and empty state instance as layout and error components 
   * are handled in the LayoutApi plugin for the Piral API. This demonstrates the ability
   * to use different pilets to control the UX Layout and other components
   * of the user interface.
   * 
   * The POC uses both statically defined pilets (availablePilets) as well as pilets defined
   * in the mock Kras piletFeed service (./mocks/piletFeed.js). Piral typically 
   * recommends a "feed service" that can load pilets dynamically at
   * runtime. 
   */
  const instance = createInstance({
    async: true,
    debug: true,

    state: {
      errorComponents: {},
      components: {},
      routes: {
        '/embed': Page,
      },
    },
    plugins: [
      createLayoutApi(),
      createPlatformApi(),
    ],
    requestPilets() {
      return fetch('http://localhost:1234/api/v1/feed/lms')
        .then((res) => res.json())
        .then((res) => res.items);
    },
    availablePilets
  });

  
  /* Render the Piral Instance inside the Open edX AppProvider */ 
  ReactDOM.render(
    <AppProvider store ={store}>
      <Piral instance={instance} />
    </AppProvider>,
    document.querySelector('#root')
  );
});

// Open edX APP_INIT_ERROR handler. 
subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage locale='en-us' message={error.message} />, 
    document.querySelector('#root')
  );
});

// Open edX frontend-initialization. 
initialize({
  /* Messages and Config:
   *
   * Similar to reducers and sagas, MFE specific internationalization messages and 
   * config are not available during shell initialization. The Piral instance uses
   * an API extension to allow these to be merged into the internationalization
   * modules while the MFE is initialized, which is now decoupled from
   * the platform initialization. Frontend-platform has to expose some additional 
   * endpoints for this to work
   */
  messages: messages,
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
  handlers: {},
});