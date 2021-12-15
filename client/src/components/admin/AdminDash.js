import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/scss/admin_panel.scss';

import DashNav from './DashNav';
import DashView from './DashView';

function AdminDash() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(
  //   () => {
  //     user.validateJWT(() => navigate('../login', { state: { from: location } }))
  //   },
  //   []
  // );

  return (
    <div style={{ maxWidth: '99vw' }}>
      <Row>
        <Col sm={2}>
          <DashNav />
        </Col>
        <Col sm={10}>
          <DashView />
        </Col>
      </Row>
    </div>
  );
}

export default AdminDash;
