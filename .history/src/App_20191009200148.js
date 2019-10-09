import React from 'react';
import './App.css';
import Home from './page/Home'
import Activity from './page/activity'
import Work from './page/work'
import Personal from './page/personal'
import { Router, Route } from 'react-router'

class App extends React.Component{
  render(){
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="Activity" component={Activity} />
        <Route path="Work" component={Work} />
        <Route path='Personal' component={Personal} />
      </Router>
    );
  }
}

export default App;
