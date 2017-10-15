import './index.css';
import { createStore } from 'redux';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.body);
registerServiceWorker();
