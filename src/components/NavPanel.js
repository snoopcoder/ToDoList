import React, { Component } from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  NavItem,
  MenuItem,
  Button
} from "react-bootstrap";

class NavPanel extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>ToDo List</a>{" "}
            {this.props.user.role === "admins" ? (
              <span className="text-danger"> Администратор</span>
            ) : (
              ""
            )}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title={this.props.user.name}
              id="basic-nav-dropdown"
            >
              <NavItem eventKey={1} href="/logout">
                Logout
              </NavItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavPanel;
