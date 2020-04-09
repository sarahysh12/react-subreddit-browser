import React, { Component } from 'react';
import './App.css';
import SubReddits from './containers/SubReddits/SubReddits';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SubReddits/>
      </div>
    );
  }
}

export default App;
