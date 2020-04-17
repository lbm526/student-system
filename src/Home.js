import React, { Component } from 'react';
import BottomNav from './page/bottomNav'
// import HomePage from './page/homePage'
import Activity from './page/activity'
import Work from './page/work'
// import Personal from './page/personal'
import {
    Route, withRouter,
    Switch,
    Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './css/bottomNav.css'

// Get the current location.
// const location = history.location;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationHref: '/#/homePage',
            value: '/#/Activity'
        };
        this.routerOpt = {
            '/#/Activity/:fId': Activity,
            '/#/Work': Work,
        }
        this.goPath = '/#/Activity';
        // props.history.location.hash 浏览器地址
        // props.location.hash react的
        if (props.location.hash == '') {
            this.props.history.push({
                pathname: this.goPath
            });
        } else {
            this.props.history.push({
                pathname: props.location.hash
            });
        }

        this.changNav = this.changNav.bind(this);
    }

    changNav(path) {
        // 切换页面
        this.goPath = path;
        this.props.history.push({
            pathname: this.goPath
        })
        this.setState({
            locationHref: path
        })
    }
    render() {
        return (
            <div>
                <React.Fragment>
                    <div id='AppMain' style={{ padding: '0 8px' }}>
                        {/* {
                            Object.keys(this.routerOpt).map((key, index) => {
                                return (
                                    index === 0 ? <Route key={index} path={key} exact component={this.routerOpt[key]} />
                                        : <Route key={index} path={key} component={this.routerOpt[key]} />
                                )
                            })
                        } */}
                        {/* <Switch> */}
                        {/* <Route path='/homePage' exact component={HomePage} /> */}
                        <Switch>
                            <Route path={'/#/Activity'} exact component={Activity} />
                            <Route path={'/#/Activity/:fId'} component={Activity} />
                            <Route path={'/#/Work'} component={Work} />
                        </Switch>
                        {/* <Route path="/Personal" component={Personal} /> */}
                    </div>

                    <BottomNavigation
                        value={this.state.value}
                        onChange={(event, newValue) => {
                            // TODO
                            this.setState({
                                value: newValue
                            })
                            this.changNav(newValue);
                            // console.log(this.props.history)

                        }}
                        showLabels
                        className={'navStyle'}
                    >
                        {/* <BottomNavigationAction label="首页" value="/homePage" icon={<RestoreIcon />} /> */}
                        <BottomNavigationAction label="活动" value="/#/Activity" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="作业" value="/#/Work" icon={<LocationOnIcon />} />
                        {/* <BottomNavigationAction label="我的" value="/Personal" icon={<LocationOnIcon />} /> */}
                    </BottomNavigation>
                </React.Fragment>
            </div>

        );
    }
}

export default withRouter(Home);