import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AddMatch from "./views/AddMatch";
import OsuAppBar from './assets/components/OsuAppBar'
import OsuAppBarMobile from './assets/components/OsuAppBarMobile'
import MatchDetail from './views/MatchDetail';
import MatchHistory from './views/MatchHistory';
import Login from './views/Login';
import PlayerList from './views/PlayerList';
import PlayerDetail from './views/PlayerDetail'
import { useAuth } from './auth'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddAbandonedMatch from './views/AddAbandonedMatch';
import Simulation from './views/Simulation';

// Datagrid area: 1678

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App() {
  const [state, setState] = useState({
    mobileView: false
  })
  const { mobileView } = state;
    
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 768
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);
    
    
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
      <CssBaseline />
      <Fragment> 
        <Router>
          { mobileView ? <OsuAppBarMobile /> : <OsuAppBar /> }
          <Switch>
            <Redirect exact from="/" to="/matches" />
            <PrivateRoute path="/matches/new" component={ AddMatch } />
            <PrivateRoute path="/matches/abandoned" component={ AddAbandonedMatch } />
            <Route path="/matches/:matchId" component={ MatchDetail } />
            <Route path="/matches" component={ MatchHistory } />
            <Route path="/players/:playerId" component={ PlayerDetail } />
            <Route path="/players" component={ PlayerList } />            
            <Route path="/login" component={ Login } />
            <Route path="/simulation" component={ Simulation } />
          </Switch>
        </Router>
      </Fragment>
    </ThemeProvider>
  );
}


