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
import AuthorPost from './components/content/author/author-post/author-post';
import BookList from './components/content/book/book-list/book-list';
import BookPost from './components/content/book/book-post/book-post';
import CartTable from './components/content/cart/cart-table/cart-table';
import UserTable from './components/content/user/table-user/table-user';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <App />
        <Route exact path='/' component={BookList} />
        <Route path='/filter' component={BookList} />
        <Route path='/book/:id' component={BookPost} />
        <Route path='/registration' component={CreateUser} />
        <Route exact path='/authors' component={Author} />
        <Route path='/author/:id' component={AuthorPost} />
        <Route path='/login' component={Login} />
        <Route path='/cart' component={CartTable} />
        <Route path='/users' component={UserTable} />
      </Provider>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
serviceWorker.unregister();
