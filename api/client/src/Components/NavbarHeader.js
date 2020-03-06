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
      >
        <Navbar.Brand onClick={() => this.props.pageHandler("home")}>
          DashBoard
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => this.props.pageHandler("history")}>
            History
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
