import React from 'react';
import './App.css';
import Home from './page/Home'
import Activity from './page/activity'
import Work from './page/work'
import Personal from './page/personal'
import { Router, Route } from 'react-router'
function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}>
        <Route path="Activity" component={Activity} />
        <Route path="Work" component={Work} />
        <Route path='Personal' component={Personal}/>
      </Route>
    </Router>
  );
}

export default App;
