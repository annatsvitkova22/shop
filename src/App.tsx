import React, { Component } from 'react';
import './App.css';
import Authors from './containers/author-list';

const App: React.FC = () => {
    return (
      <div className="App">
        <Authors />
      </div>
    );
  };


export default App;
