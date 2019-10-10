import React, { Component } from 'react';
import BottomNav from './page/bottomNav'
import HomePage from './page/homePage'
import Activity from './page/activity'
import Work from './page/work'
import Personal from './page/personal'
import {
    Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Get the current location.
const location = history.location;

// // Listen for changes to the current location.
// const unlisten = history.listen((location, action) => {
//     // location is an object like window.location
//     console.log(action, location.pathname, location.state);
// })
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationHref: '/homePage'
        };
        this.changPath = this.changPath.bind(this);
    }
    changPath(path) {
        // this.props.history.push(path)
        // 切换页面
        history.push(path)
    }
    render() {
        return (
            <div>
                <div id='AppMain' style={{padding: '0 8px'}}>
                    <Router history={history}>
                        <Switch>
                            <Route path='/homePage' exact component={HomePage} />
                            <Route path="/Activity" component={Activity} />
                            <Route path="/Work" component={Work} />
                            <Route path="/Personal" component={Personal} />
                            <Route path='*'>
                                <Redirect to='/homePage' />
                            </Route>
                        </Switch>

                    </Router>

                </div>

                <BottomNav linkTo={this.changPath} />
            </div>

        );
    }
}

export default Home;