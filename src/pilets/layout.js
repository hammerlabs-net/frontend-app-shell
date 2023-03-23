import React from 'react';
import { Link } from 'react-router-dom'; 


import { Helmet } from 'react-helmet';
import { getConfig } from '@edx/frontend-platform';

const Head = () => (
  <Helmet>
    <title>
      Piral Open Edx Prototype
    </title>
    <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
  </Helmet>
);

const Home = ({Header, Footer}) => (
  <>
    <Head />
    <Header />
    <Footer />
  </>

);

const Page2 = () => (
  <div>
    <p>This is Page 2</p>
    <p>Go back to <Link to="/">Home</Link>.</p>
  </div>
);

export default {
  name: 'openEdx Layout',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {

    piralApi.registerPage('/', ({piral}) => (
      <Home 
        Header={() => <piral.Extension name='openedx-header'/>}
        Footer={() => <piral.Extension name='openedx-footer'/>}
        />
    ));

    piralApi.registerPage('/2', () => (
      <Page2 />
    ));

  },
};
