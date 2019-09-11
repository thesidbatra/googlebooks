import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Saved from "./components/saved.component";
import Search from "./components/search.component";

import logo from "./logo.svg"
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://www.siddharthbatra.com" target="_blank">
              <img src={logo} width="30" height="30"></img>
            </a>
            <Link to="/" className="navbar-brand">Google Books Search+Save!</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Search</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/saved" className="nav-link">Saved</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Search}></Route>
          {/* <Route path="/saved" component={Saved}></Route> */}
        </div>
      </Router>
    );
  }

}

export default App;
