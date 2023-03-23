import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { SwitchErrorInfo } from 'piral-core';

export const errors = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back <Link to="/">to the dashboard</Link>.
      </p>
    </div>
  ),
};

export const ErrorInfo = props => (
  <>
    <div>
      <h1>Error</h1>
      <SwitchErrorInfo {...props} />
    </div>
  </>
);


export const Layout = ({ children }) => (
      <div className="app-container">
        {children}
      </div>
)
