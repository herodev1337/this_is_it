import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';

export default function RedirectWrapper({ children }) {
    const auth = useAuth();
    const location = useLocation();
    const [route, setRoute] = useState(children)
  
    useEffect(() => {
      setRoute(auth.authenticate() ? children : <Navigate to="/admin/login" state={{ from: location }}/>)
    }, [auth]);
  
    return route;
  }