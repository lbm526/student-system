import React, { Component } from 'react';
import Nav from './page/BottomNav'
import Activity from './page/activity'
import Work from './page/work'
import Personal from './page/personal'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div id='AppMain'>
                <Switch>
                    <Route path="/Activity" component={Activity}/>
                    <Route path="/Work" component={Work}/>
                    <Route path="/Personal" component={Personal}/>
                    <Redirect to='/Home' />
                </Switch>
            </div>
                <Nav />
            </div>

        );
    }
}

export default Home;