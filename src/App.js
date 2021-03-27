import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddMatch from "./views/AddMatch";
import OsuAppBar from './assets/components/OsuAppBar'
import PlayerView from './views/PlayerView';
import MatchDetail from './views/MatchDetail';
import MatchHistory from './views/MatchHistory';
import Login from './views/Login';

export default function App() {
    return(
        <Fragment> 
          <Router>
            <OsuAppBar />
            <Switch>
              <Route exact path="/" component={ AddMatch } />
              <Route path="/matches/:matchId" component={ MatchDetail } />
              <Route path="/matches" component={ MatchHistory } />
              <Route path="/players" component={ PlayerView } />
              <Route path="/login" component={ Login } />
            </Switch>
          </Router>
        </Fragment>
      );
}


