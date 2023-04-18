import React from 'react';
import { Link, Redirect } from 'react-router-dom'; 

import { Helmet } from 'react-helmet';
import { getConfig } from '@edx/frontend-platform';

import { SwitchErrorInfo } from 'piral-core';

import './style.scss'


const Head = () => (
  <Helmet>
    <title>
      Piral Open Edx Prototype
    </title>
    <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
  </Helmet>
);

const OpenEdxLayout = ({ children, Header, Footer}) => (
  <div>
    <Head />
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  </div>

);


export const OpenEdxErrorInfo = (props) => (
  <div>
    <h1>Error</h1>
    <div className="error-container">
      <SwitchErrorInfo {...props} />
    </div>
  </div>
);
const Home = () => (
  <div>
    <p>This is the Shell Home Page at '/'. Ideally a pilet takes this over one day</p>
    <p>Go to <Link to="/account">Account MFE</Link>.</p>
    <p>Go to <Link to="/learning">Learning MFE</Link>.</p>
  </div>
);


const errors = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back <Link to="/">Home</Link>.
      </p>
    </div>
  ),
};

export default {
  name: 'openEdx Layout',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {


    piralApi.setLayout( {
      Layout: (({piral, children}) =>
        <OpenEdxLayout
          Header={() => <piral.Extension name='openedx-header'/>}
          Footer={() => <piral.Extension name='openedx-footer'/>}>
          {children}
        </OpenEdxLayout>
      ),
      ErrorInfo: (props) =>
      <OpenEdxErrorInfo {...props} />
      },
      errors),

    piralApi.registerPage('/', () => (
      <Home /> 
    ));

    piralApi.registerPage('/dashboard', () => (
      <Home />
    ));

  },
};
