import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
function BottomNav() {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            position: 'fixed',
            bottom:0,
            left: 0
        },
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return (
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(value)
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="首页" value="首页" icon={<RestoreIcon />} />
                <BottomNavigationAction label="活动" value="活动" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="作业" value="作业" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="我的" value="我的" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </div>
    )
}

export default BottomNav