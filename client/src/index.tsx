import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './scenes/App';

import { extractRouter, registerRouter } from './registerRouter';
import { ClientContextProvider } from 'react-fetching-library';
import client from './client';

require("dotenv-flow").config();

const render = (Component: React.ComponentType) => {  
  const AppMount = extractRouter(registerRouter)(Component);
  ReactDOM.render(
        <ClientContextProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <AppMount/>
      </ConnectedRouter>
    </Provider>
        </ClientContextProvider>
  , document.getElementById('app'));
};

render(App);

// For hot reloading of react components
if ((module as any).hot) {
  (module as any).hot.accept('./scenes/App', () => {
    render(App);
  });
}
