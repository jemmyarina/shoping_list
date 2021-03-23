import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Dashboard from './components/Dashboard.js';
import Playground from './learn/Playground';
import UseState from './learn/hooks/UseState';
import StateObject from './learn/hooks/StateObject';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/signin" />
          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/playground" component={Playground} />
          <Route exact path="/state" component={UseState} />
          <Route exact path="/stateobject" component={StateObject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
