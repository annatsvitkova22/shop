import React, { FC } from 'react';
import './App.css';

import Header from './containers/header.container';
import Footer from './components/footer/footer';

const App: FC = ({ children }) => {
  return (
    <div className="App">
      <Header  />
      {children}
      <Footer />
    </div>
  );
};


export default App;
