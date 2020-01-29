import React, { Component } from "react";
import "./App.css";
import GarbageCanList from "./Components/GarbageCanList";
import NavbarHeader from "./Components/NavbarHeader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarHeader />
        <header className="App-header">
          <GarbageCanList />
        </header>
      </div>
    );
  }
}

export default App;
