import React from 'react';
import {Outlet} from 'react-router-dom';
import LandingPage from '../components/knowledge/LandingPage';

import "styles/scss/knowledge.scss"

export default function App() {
  return (
    <div>
      <LandingPage />
      <Outlet />
    </div>
  );
}
