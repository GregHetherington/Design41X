import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

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
        <Navbar.Brand href="#home">Trash-Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
    );
  }
}
