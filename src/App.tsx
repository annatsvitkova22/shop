import React, { FC } from 'react';
import './App.css';
import Author from './containers/author-list';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Route } from 'react-router';

const App: FC = ({ children }) => {
  return (
    <div className="App">
      <Header />
      {children}
      <Footer />
    </div>
  );
};


export default App;
