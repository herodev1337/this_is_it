import React from 'react';
import Col from 'react-bootstrap/Col';

import '../../styles/scss/admin_panel.scss';

import DashNav from './DashNav';
import DashView from './DashView';

function AdminUser() {
  return (
    <div>
      <Col sm={2}>
        <DashNav />
      </Col>
      <Col sm={10}>
        <DashView />
      </Col>
    </div>
  );
}

export default AdminUser;
