import * as React from 'react';

import Header from '@edx/frontend-component-header';

const piletSpec = {
  name: 'openEdx Footer',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {
    piralApi.registerExtension('openedx-header', () => (
      <Header />
    ));
  },

};

export default piletSpec;
