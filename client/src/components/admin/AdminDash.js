import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../../styles/scss/admin_panel.scss';

import DashNav from './DashNav';
import DashView from './DashView';

function AdminDash() {
  // TODO: add auth context (preferably using hooks)

  return (
    <div style={{maxWidth: "99vw"}}>
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
