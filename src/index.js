import './index.css';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body,
);
registerServiceWorker();
