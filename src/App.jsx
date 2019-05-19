import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Items from './Items';
import Login from './Login';
import withAuth from './withAuth';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <Route exact path="/" component={withAuth(Items)} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
    );
  }
}

export default App;
