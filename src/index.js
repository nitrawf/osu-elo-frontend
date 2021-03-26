import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import AddMatch from "./views/AddMatch";
import Nav from './assets/components/Nav'
import OsuAppBar from './assets/components/OsuAppBar'
import MatchView from './views/MatchView';
import PlayerView from './views/PlayerView';

ReactDOM.render(
  <Fragment> 
    <Router>
      <OsuAppBar />
      <Switch>
        <Route exact path="/" component={ AddMatch } />
        <Route exact path="/matches" component={ MatchView } />
        <Route exact path="/players" component={ PlayerView } />
      </Switch>
    </Router>
  </Fragment>
  ,
  document.getElementById('root')
);

