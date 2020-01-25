import React from "react";
import "./App.css";
import GarbageCanList from "./Components/GarbageCanList";
import NavbarHeader from "./Components/NavbarHeader";

function App() {
  return (
    <div className="App">
      <NavbarHeader />
      <header className="App-header">
        <GarbageCanList />
      </header>
    </div>
  );
}

export default App;
