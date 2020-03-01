import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import NavbarHeader from "./Components/NavbarHeader";
import GarbageCanList from "./Components/GarbageCanList";
import HistoryPage from "./Components/HistoryPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarHeader />
        <header className="App-header">
          <Router>
            <div style={{ width: "100%" }}>
              <Switch>
                <Route exact path="/">
                  <GarbageCanList />
                </Route>
                <Route path="/history">
                  <HistoryPage />
                </Route>
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
