import React, { Component } from "react";
import "./App.css";

import NavbarHeader from "./Components/NavbarHeader";
import GarbageCanList from "./Components/GarbageCanList";
import HistoryPage from "./Components/HistoryPage";
import AboutPage from "./Components/AboutPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: "home" };

    this.pageHandler = this.pageHandler.bind(this);
  }

  pageHandler(page) {
    if (page !== this.state.activePage) {
      this.setState({ activePage: page });
    }
  }

  render() {
    const { activePage } = this.state;
    let page;
    if (activePage === "home") {
      page = <GarbageCanList />;
    } else if (activePage === "history") {
      page = <HistoryPage />;
    } else if (activePage === "about") {
      page = <AboutPage />;
    } else {
      page = <GarbageCanList />;
    }

    return (
      <div className="App">
        <NavbarHeader pageHandler={this.pageHandler} />
        <header className="App-header">
          <div style={{ width: "100%" }}>{page}</div>
        </header>
      </div>
    );
  }
}

export default App;
