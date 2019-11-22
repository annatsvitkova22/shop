import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Author from './containers/author.container';
import CreateUser from './containers/create-user.container';
import Login from './containers/login.container';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
      <App />
        <Route exact path='/registration' component={CreateUser} />
        <Route path='/authors' component={Author} />
        <Route path='/login' component={Login} />
      </Provider>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
serviceWorker.unregister();
