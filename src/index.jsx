import '@babel/polyfill';

// React
import * as React from 'react';
import ReactDOM from 'react-dom';

// Piral
import { createInstance, Piral } from 'piral-core';
import { createLayoutApi } from './api/layout';

// OpenEdx
import { subscribe, initialize, APP_READY, APP_INIT_ERROR, mergeConfig, } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
// the next two are hacks. We need an API for pilets to register messages - probably after initialize :)
import { messages as headerMessages } from '@edx/frontend-component-header';
import { messages as accountMessages } from '@edx/frontend-app-account';

// Pilets
import { pilets } from './pilets';

// Redux
import { compose, applyMiddleware, createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createLogger } from 'redux-logger';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

const loggerMiddleware = () => {
  return composeWithDevTools(applyMiddleware(createLogger({
    collapsed: true,
  })))
};

const ErrorInfo = props => (
  <>
    <div>
      <h1>Error</h1>
      <p>{props.error.message}</p>
    </div>
  </>
);

subscribe(APP_READY, () => {
  const store =  createStore({
    extensions: [
      getSagaExtension(),
      getThunkExtension(),
    ],
    loggerMiddleware,
  });

  function createApp(availablePilets) {
    try {
      const instance = createInstance({
        state: {
          errorComponents: {},
          components: {} 
        },
        plugins: [
          createLayoutApi(),
        ],
        availablePilets,
      });

      return <Piral instance={instance} />;
    } catch (error) {
      return <ErrorInfo type="loading" error={error} />;
    }
  }

  function App() {
    const [app, setApp] = React.useState(null);
    React.useEffect(() => {
      if (!app) {
        setApp(createApp(pilets));
      }
    }, [pilets, app]);
    return app || <></>;
  }

  ReactDOM.render(
    <AppProvider store={ store }>
      <App />
    </AppProvider>,
    document.querySelector('#app')
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('#app'));
});

initialize({
  messages: [
    headerMessages,
    accountMessages
  ],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        COACHING_ENABLED: (process.env.COACHING_ENABLED || false),
        ENABLE_DEMOGRAPHICS_COLLECTION: (process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false),
        DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
        PASSWORD_RESET_SUPPORT_LINK: process.env.PASSWORD_RESET_SUPPORT_LINK,
      }, 'App loadConfig override handler');
    },
  },
});