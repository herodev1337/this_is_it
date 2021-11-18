import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";

import {useAuth} from '../../utils/context-hooks/use-auth'

function Login() {
  const auth = useAuth();

  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const navigate = useNavigate();
  const location = useLocation()

  const submitLogin = (e) => {
    e.preventDefault()
    auth.login(username, password, ()=>{
      navigate(location.state ? location.state.from : '../dash/', {state: {...location.state} })
    })
  }

  return (
    <div className="container">
      <div
        className="d-flex align-item-center justify-content-center"
        style={{ minHeight: '90vh' }}
      >
        <Form className="w-50" onSubmit={e=>submitLogin(e)} >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalUsername"
          >
            <Form.Label column sm={2}>
              UserName
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" checked={remember} onChange={()=>setRemember(!remember)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Login;
