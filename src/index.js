import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import AddMatch from "./views/AddMatch";
import Nav from './assets/components/Nav'

ReactDOM.render(
  // <Router>
  //   <Switch>
  //     <Route exact path="/" component={ AddMatch } />
  //   </Switch>
  // </Router>
  <Nav />,
  document.getElementById('root')
);

