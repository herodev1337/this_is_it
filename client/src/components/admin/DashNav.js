import React from 'react';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { BoxArrowRight, PersonCheck } from 'react-bootstrap-icons';

import { useAuth } from '../../utils/hooks/use-auth'

function DashNav() {
  const auth = useAuth();

  return (
    <div className="dash-nav">
      <Row className="nav-brand">
        <PersonCheck />
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Quiz</Accordion.Header>
            <Accordion.Body>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to='./quiz-editor'>Quiz-Editor</Nav.Link>
                  <Nav.Link as={Link} to='./quizzes'>Quizzes</Nav.Link>
                </Nav.Item>
              </Nav>
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
        <Button onClick={() => auth.logout("name", ()=>{})} style={{maxWidth: "80%"}}>
          <span>Log out </span>
          <BoxArrowRight/>
        </Button>
      </Row>
    </div>
  );
}

export default DashNav;
