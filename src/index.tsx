import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import configureStore, { browserHistory } from './store';
import Login from './containers/Login/Login';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Login>
        <App/>
      </Login>
    </ConnectedRouter>
  </Provider>
);

ReactDom.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
