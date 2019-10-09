import React from 'react';
import './App.css';
import Home from './page/BottomNav'
import Activity from './page/activity'
import Work from './page/work'
import Personal from './page/personal'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/Activity" component={Activity} />
          <Route path="/Work" component={Work} />
          <Route path='/Personal' component={Personal} />
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
