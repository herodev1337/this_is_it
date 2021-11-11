import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import auth from '../components/admin/auth';

function authWrapper( { children } ) {
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
  
  return children;
}

export default authWrapper;
