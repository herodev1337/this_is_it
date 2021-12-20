import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { BoxArrowRight, PersonCheck, PlusLg } from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../utils/context-hooks/use-auth'

function DashNav() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dash-')

  useEffect(()=>{
    const tag = location.pathname.split("/").slice(3)
    setActiveView('dash-'+tag.join('-'))
  }, [location])

  return (
    <div className="dash-nav">
      <Row className="nav-brand">
        <PersonCheck />
      </Row>
        <span>{`${auth.session.username}@${activeView}`}</span>
      <Row>
        <Accordion>
          <ListGroupItem id="dash-main" as={Link} to='./'>Main</ListGroupItem>

          <Accordion.Item id="dash-posts" eventKey="0">
            <Accordion.Header as={Link} to='./posts'>Posts</Accordion.Header>
            <Accordion.Body>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to='./'>placeholder</Nav.Link>
                </Nav.Item>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item id="dash-users" eventKey="1">
            <Accordion.Header as={Link} to='./users'>Users</Accordion.Header>
            <Accordion.Body>
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to='./'><PlusLg /> Add User</Nav.Link>
                </Nav.Item>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item id="dash-quizzes" eventKey="2">
            <Accordion.Header as={Link} to='./quizzes'>Quiz</Accordion.Header>
            <Accordion.Body>
              <Nav>
                <Nav.Item id="dash-quiz-editor">
                  <Nav.Link as={Link} to='./quiz-editor'><PlusLg /> Create New</Nav.Link>
                </Nav.Item>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Row>
      <Row>
        <Button onClick={() => auth.logout(auth.session.username, () => {
          navigate("/admin/login", { from: location })
        })} style={{maxWidth: "80%"}}>
          <span>Log out </span>
          <BoxArrowRight/>
        </Button>
      </Row>
    </div>
  );
}

export default DashNav;
