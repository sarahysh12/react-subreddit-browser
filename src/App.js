import React, { Component } from 'react';
import './App.css';
import SubReddits from './containers/SubReddits/SubReddits';
import { Route, Switch } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import FullPost from './components/FullPost/FullPost';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
              <Route path="/" exact component={SubReddits}/>
              <Route path="/r/:name" component={Posts}/> 
              <Route path="/r/:name/posts/:pid" component={FullPost}/> 
        </Switch>
      </div>
    );
  }
}

export default App;
