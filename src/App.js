import React, { Component } from 'react';
import './App.css';
import SubReddits from './containers/SubReddits/SubReddits';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SubReddits</h1>
        </header>
        <SubReddits/>
      </div>
    );
  }
}

export default App;
