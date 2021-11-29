import React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthWrapper } from '../utils/context-hooks/use-auth';
import { UserWrapper } from '../utils/context-hooks/use-user';
import { ApiWrapper } from '../utils/context-hooks/use-api';

export default function App() {
  return (
    <div>
      <ApiWrapper>
        <UserWrapper>
          <AuthWrapper>
            {/* <p>Admin Seite</p> */}
            <Outlet />
          </AuthWrapper>
        </UserWrapper>
      </ApiWrapper>
    </div>
  );
}
