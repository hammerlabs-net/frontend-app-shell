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
import { messages as learningMessages } from '@edx/frontend-app-learning';
// Pilets
import { pilets as availablePilets } from './pilets';

// Redux
import { applyMiddleware } from 'redux';
import { createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createLogger } from 'redux-logger';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

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



subscribe(APP_READY, () => {
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

  ReactDOM.render(
    <AppProvider store={ store }>
      <Piral instance={instance} />
    </AppProvider>,
    document.querySelector('#root')
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('#app'));
});

initialize({
  messages: [
    headerMessages,
    accountMessages,
    learningMessages
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
        CONTACT_URL: process.env.CONTACT_URL || null,
        CREDENTIALS_BASE_URL: process.env.CREDENTIALS_BASE_URL || null,
        CREDIT_HELP_LINK_URL: process.env.CREDIT_HELP_LINK_URL || null,
        DISCUSSIONS_MFE_BASE_URL: process.env.DISCUSSIONS_MFE_BASE_URL || null,
        ENTERPRISE_LEARNER_PORTAL_HOSTNAME: process.env.ENTERPRISE_LEARNER_PORTAL_HOSTNAME || null,
        ENABLE_JUMPNAV: process.env.ENABLE_JUMPNAV || null,
        ENABLE_NOTICES: process.env.ENABLE_NOTICES || null,
        INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
        SEARCH_CATALOG_URL: process.env.SEARCH_CATALOG_URL || null,
        SOCIAL_UTM_MILESTONE_CAMPAIGN: process.env.SOCIAL_UTM_MILESTONE_CAMPAIGN || null,
        STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
        SUPPORT_URL_CALCULATOR_MATH: process.env.SUPPORT_URL_CALCULATOR_MATH || null,
        SUPPORT_URL_ID_VERIFICATION: process.env.SUPPORT_URL_ID_VERIFICATION || null,
        SUPPORT_URL_VERIFIED_CERTIFICATE: process.env.SUPPORT_URL_VERIFIED_CERTIFICATE || null,
        TERMS_OF_SERVICE_URL: process.env.TERMS_OF_SERVICE_URL || null,
        TWITTER_HASHTAG: process.env.TWITTER_HASHTAG || null,
        TWITTER_URL: process.env.TWITTER_URL || null,
        LEGACY_THEME_NAME: process.env.LEGACY_THEME_NAME || null,
        EXAMS_BASE_URL: process.env.EXAMS_BASE_URL || null,
      }, 'App loadConfig override handler');
    },
  },
});