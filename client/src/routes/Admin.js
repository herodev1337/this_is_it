import React from 'react';
import { Outlet } from 'react-router';

import { AuthWrapper } from '../utils/context-hooks/use-auth';
import { UserWrapper } from '../utils/context-hooks/use-user';

export default function App() {
  return (
    <div>
      <UserWrapper>
        <AuthWrapper>
          {/* <p>Admin Seite</p> */}
          <Outlet />
        </AuthWrapper>
      </UserWrapper>
    </div>
  );
}
