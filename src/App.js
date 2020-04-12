import React, { Component } from 'react';
import './App.css';
import SubReddits from './containers/SubReddits/SubReddits';
import { Route, Switch } from 'react-router-dom';
import Posts from './components/Posts/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/posts" component={Posts}/>
          <Route path="/" exact component={SubReddits}/>
        </Switch>
      </div>
    );
  }
}

export default App;
