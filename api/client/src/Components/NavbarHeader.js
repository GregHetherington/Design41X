import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class NavbarHeader extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        sticky="top"
        variant="dark"
        style={{ height: "8vh", justifyContent: "flex-start" }}
      >
        <Navbar.Brand onClick={() => this.props.pageHandler("home")}>
          DashBoard
        </Navbar.Brand>
        <Nav style={{ paddingLeft: "10px" }}>
          <Nav.Link onClick={() => this.props.pageHandler("history")}>
            History
          </Nav.Link>
        </Nav>
        <Nav style={{ paddingLeft: "10px" }}>
          <Nav.Link onClick={() => this.props.pageHandler("about")}>
            About
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
