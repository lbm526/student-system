import React from 'react';
import './App.css';
import Home from './page/Home'
import { Router, Route, Link } from 'react-router'
function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}>
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox}>
          <Route path="messages/:id" component={Message} />
        </Route>
      </Route>
    </Router>
  );
}

export default App;
