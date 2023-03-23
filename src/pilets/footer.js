import * as React from 'react';

import Footer from '@edx/frontend-component-footer';

const piletSpec = {
  name: 'openEdx Footer',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {
    piralApi.registerExtension('openedx-footer', () => (
      <Footer />
    ));
  },

};

export default piletSpec;
