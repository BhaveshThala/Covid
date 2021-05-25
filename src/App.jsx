import React, { Component, Fragment } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import States from './States'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Helpline from './Helpline'
import Plasma from './Plasma'
import Oxygen from './Oxygen'
import Header from './Header'
class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Header />
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                <ul className="nav navbar setting fixed-bottom bg-dark nav-tabs">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="fa fa-home fa-2x dash"></i>
                    </Link>
                    <div className="text">
                      Home
                </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/states">
                      <i className="fa fa-globe fa-2x dash" style={{ color: 'white' }}>
                      </i>
                    </Link>
                    <div className="text">
                      State
                </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/helpline">
                      <i className="fa fa-phone fa-2x dash" style={{ color: 'white' }}>
                      </i>
                    </Link>
                    <div className="text">
                      Helpline
                </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/plasma">
                      <i className="fa fa-ambulance fa-2x dash" style={{ color: 'white' }}>
                      </i>
                    </Link>
                    <div className="text">
                      Plasma
                </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/oxygen">
                      <i className="fa fa-medkit fa-2x dash" style={{ color: 'white' }}>
                      </i>
                    </Link>
                    <div className="text">
                      Oxygen
                </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <Switch>
                <Route exact path="/"><Dashboard /></Route>
                <Route path="/states"><States /></Route>
                <Route path="/helpline"><Helpline /></Route>
                <Route path="/plasma"><Plasma /></Route>
                <Route path="/oxygen"><Oxygen /></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Fragment>
    )
  }
}

export default App
