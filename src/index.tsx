import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Author from './containers/author-list';
import CreateUser from './components/content/user/create-user';

ReactDOM.render((
  <BrowserRouter>
    <App />
    <Switch>
      <Provider store={store}>
        <Route exact path='/' component={CreateUser} />
        <Route path='/authors' component={Author} />
      </Provider>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
serviceWorker.unregister();
