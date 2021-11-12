import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  // withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
  }
});

function Login() {
  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const submitLogin = (e) => {
    e.preventDefault()
    api
      .post('./login', {username: username, password: password})
      .then(function(response) {
        console.log(response.data.data.message);
      })
      .catch(function(error) {
        console.log(error.message);
      });
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
