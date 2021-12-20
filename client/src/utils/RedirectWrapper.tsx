import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './context-hooks/use-auth';

export default function RedirectWrapper({ children }: {children: React.ReactElement}) {
    const auth = useAuth();
    const location = useLocation();
    const [route, setRoute] = useState(children)
  
    useEffect(() => {
      setRoute(auth.checkLocalSession() ? children : <Navigate to="/admin/login" state={{ from: location }}/>)
    }, [auth]);
  
    return route;
  }