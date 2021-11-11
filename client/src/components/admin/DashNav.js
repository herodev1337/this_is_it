import React from 'react';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Nav from 'react-bootstrap/Nav';
import { PersonCheck } from 'react-bootstrap-icons';

function DashNav() {
  return (
    <div className="dash-nav">
      <Row className="nav-brand">
        <PersonCheck />
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              <Nav></Nav>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              <Nav></Nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row>
      </Row>
    </div>
  );
}

export default DashNav;
