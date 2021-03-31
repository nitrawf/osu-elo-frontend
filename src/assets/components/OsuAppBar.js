import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useAuth, logout } from "../../auth"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2)
  },
  tabLink : {
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
}));

export default function OsuAppBar() {
  let logged = useAuth()[0];
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0)
  
  const handleTabChange = (e , val) => {
    setTabValue(val);
  }
  
  useEffect(() => { // For setting the value of selected tab on page load
    if (window.location.pathname.startsWith('/matches')) {
      setTabValue(0);
    }
    else if (window.location.pathname.startsWith('/players')) {
      setTabValue(1);
    }
  }, [])
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={tabValue} onChange={handleTabChange} style={{ flex: 1 }}>
            <Tab className={classes.tabLink} key="matches" value={0} label="Matches" component={Link} to="/matches" />
            <Tab className={classes.tabLink} key="players" value={1} label="Players" component={Link} to="/players" />        
          </Tabs>
          {!logged ?
          <IconButton component={Link} key="login" to="/login">
            <AccountCircleIcon />
            <Typography variant="button" color="inherit" className={classes.title}>
              Login
            </Typography>
          </IconButton>
          :
          <Fragment>
            <Typography style={{ paddingLeft: 5 }} variant="button" color="inherit">
              Welcome {window.localStorage.getItem('user')}!
            </Typography>
            <IconButton key="logout"onClick={() => {logout();logged=false}}>
              <ExitToAppIcon />
            </IconButton>
          </Fragment>
          
          }

        </Toolbar>
      </AppBar>
    </div>
    
  )
}