import * as React from 'react';

const piletSpec = {
  name: 'openEdx Footer',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {
    piralApi.registerExtension('openedx-footer', () => (
      <div align="center">
        This is an alternative footer extension.
      </div>
    ));
  },

};

export default piletSpec;
