import * as React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
const messages = {
  'en': {
    "foot.message": 'This pilet shows how to load pilet messages via the API extensions.'
  },
};


const piletSpec = {
  name: 'openEdx Footer',
  version: '1.0.0',
  spec: 'v2',
  dependencies: {},
  config: {},
  basePath: '/pilets',
  setup(piralApi) {
    piralApi.mergeMessages(messages);
    piralApi.registerExtension('openedx-footer',  
      injectIntl(() => (
        <div style={{textAlign:'center',backgroundColor:'grey',border:'5px solid red'}}>
          <p><FormattedMessage id='foot.message' /></p>
        </div>
      ))
    );
  },

};

export default piletSpec;
