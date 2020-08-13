import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Users from './pages/Users'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Contribute from './pages/Contribute';

import Navbar from './layouts/Navbar';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
// import IntervalExample from './components/IntervalExample';
// import TestChild from './components/TestChild';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          {/*
            <TestChild name="test">
              Hello from my world;
            </TestChild>ß          
          */}
          {/* <IntervalExample/> */}
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/add-user" component={AddUser}/>
            <Route exact path="/update-user/:id" component={UpdateUser}/>
            <Route exact path="/contribute" component={Contribute}/>
            <Route exact component={NotFound}/>

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
