import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authors from './components/author';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authors />
      </div>
    );
  }
}

export default App;
