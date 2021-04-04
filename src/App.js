import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AddMatch from "./views/AddMatch";
import OsuAppBar from './assets/components/OsuAppBar'
import MatchDetail from './views/MatchDetail';
import MatchHistory from './views/MatchHistory';
import Login from './views/Login';
import PlayerList from './views/PlayerList';
import PlayerDetail from './views/PlayerDetail'
import { useAuth } from './auth'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App() {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      const [logged] = useAuth();
      return <Route {...rest} render={(props) => (
        logged
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    }

    return(
      <ThemeProvider theme={theme}>
        <Fragment> 
          <Router>
            <OsuAppBar />
            <Switch>
              <Redirect exact from="/" to="/matches" />
              <PrivateRoute path="/matches/new" component={ AddMatch } />
              <Route path="/matches/:matchId" component={ MatchDetail } />
              <Route path="/matches" component={ MatchHistory } />
              <Route path="/players/:playerId" component={ PlayerDetail } />
              <Route path="/players" component={ PlayerList } />            
              <Route path="/login" component={ Login } />
            </Switch>
          </Router>
        </Fragment>
      </ThemeProvider>
      );
}


