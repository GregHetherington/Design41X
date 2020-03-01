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
        <Navbar.Brand href="/">Trash-Board</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link active href="/history">
            History
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
