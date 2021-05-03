import React, { Component, Fragment } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import States from './States'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Helpline from './Helpline'
import Plasma from './Plasma'
class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
        <nav className="navbar fixed-top navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
            <label className="navbar-brand">Covid</label>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  <i className="fa fa-home dash"></i>
                      Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/states">
                  <i className="fa fa-globe dash" style={{color:'white'}}>
                  </i>
                      States
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/helpline">
                  <i className="fa fa-phone dash" style={{color:'white'}}>
                  </i>
                      Helpline Numbers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/plasma">
                  <i className="fa fa-ambulance dash" style={{color:'white'}}>
                  </i>
                      Plasma
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <Switch>
              <Route exact path="/"><Dashboard/></Route>
              <Route path="/states"><States/></Route>
              <Route path="/helpline"><Helpline/></Route>
              <Route path="/plasma"><Plasma/></Route>
            </Switch>
          </div>
        </div>
        </Router>
      </Fragment>
    )
  }
}

export default App
