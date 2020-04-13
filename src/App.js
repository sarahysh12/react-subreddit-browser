import React, { Component } from 'react';
import './App.css';
import SubReddits from './containers/SubReddits/SubReddits';
import { Route, Switch } from 'react-router-dom';
import Posts from './containers/Posts/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
              <Route path="/" exact component={SubReddits}/>
              <Route path="/r/:name" component={Posts}/> 
        </Switch>
      </div>
    );
  }
}

export default App;
