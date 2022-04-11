import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { environment } from './environments/environment';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { AppRouter } from './app';
import { Alerts } from './app/ui';

if (!environment.production) {
  const { worker } = require('./app/mocks/browser');
  worker.start();
}

ReactDOM.render(
  <StrictMode>
    <Alerts />
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
