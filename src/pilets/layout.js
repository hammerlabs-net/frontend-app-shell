import React from 'react';
import { Link } from 'react-router-dom'; 

import { Helmet } from 'react-helmet';
import { getConfig } from '@edx/frontend-platform';

import { SwitchErrorInfo } from 'piral-core';



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
    <Header />
    <div className="app-container">
      {children}
    </div>
    <Footer />
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
    <p>This is the home page@</p>
    <p>Go to <Link to="/2">Page 2</Link>.</p>
    <p>Go to <Link to="/null">Not Found</Link>.</p>
  </div>
);

const Page2 = () => (
  <div>
    <p>This is page 2</p>
    <p>Go to back <Link to="/">Home</Link>.</p>
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

    piralApi.registerPage('/2', () => (
      <Page2 />
    ));

  },
};
