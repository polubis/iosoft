import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
import { environment } from './environments/environment';
import { store } from './app/store';
import { Provider } from 'react-redux';

if (!environment.production) {
  const { worker } = require('./app/mocks/browser');
  worker.start();
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
