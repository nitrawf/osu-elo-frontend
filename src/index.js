import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import AddMatch from "./views/AddMatch";
import OsuAppBar from './assets/components/OsuAppBar'
import PlayerView from './views/PlayerView';
import MatchDetail from './views/MatchDetail';
import MatchHistory from './views/MatchHistory'

ReactDOM.render(
  <Fragment> 
    <Router>
      <OsuAppBar />
      <Switch>
        <Route exact path="/" component={ AddMatch } />
        <Route path="/matches/:matchId" component={ MatchDetail } />
        <Route path="/matches" component={ MatchHistory } />
        <Route path="/players" component={ PlayerView } />
      </Switch>
    </Router>
  </Fragment>
  ,
  document.getElementById('root')
);

