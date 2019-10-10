import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    useHistory
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import '../css/bottomNav.css'

class BottomNav extends React.Component {
    constructor(props){
        super(props)
        this.changNav = this.changNav.bind(this);
        this.state = {
            value: '/homePage'
        }
    }
    changNav(path){
       this.props.linkTo(path)
    }
    render() {
        return (
            <div>
                <BottomNavigation
                    value={this.state.value}
                    onChange={(event, newValue) => {
                        this.setState({
                            value: newValue
                        })
                        this.changNav(newValue);
                        // console.log(this.props.history)
                        
                    }}
                    showLabels
                    className={'navStyle'}
                >
                    <BottomNavigationAction label="首页" value="/homePage" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="活动" value="/Activity" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="作业" value="/Work" icon={<LocationOnIcon />} />
                    <BottomNavigationAction label="我的" value="/Personal" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </div>
        )
    }
}
export default BottomNav