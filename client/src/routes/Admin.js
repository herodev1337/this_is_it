import React from 'react';
import { Outlet } from 'react-router';

import { AuthWrapper } from '../utils/hooks/use-auth';

export default function App() {
  return (
    <div>
      <AuthWrapper>
        {/* <p>Admin Seite</p> */}
        <Outlet />
      </AuthWrapper>
    </div>
  );
}
