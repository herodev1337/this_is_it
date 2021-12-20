import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

function TIITNavbar({style}: {style: Object}) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={style}>
        <Container>
          <Navbar.Brand as={Link} to="./">This is IT</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" role="navigation">
            <Nav className="me-auto">
              <NavDropdown title="Knowledge" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="./knowledge">Info</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="./karriere">Karriere</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Games" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="./games/sqit/game1">SQIT</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="./games/quiz">Quiz</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="./admin/dash">Admin</Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="./admin/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TIITNavbar;
