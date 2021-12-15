import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthWrapper } from '../utils/context-hooks/use-auth';
import { ApiWrapper } from '../utils/context-hooks/use-api';

export default function App() {
  return (
    <div>
      <ApiWrapper>
        <AuthWrapper>
          {/* <p>Admin Seite</p> */}
          <Outlet />
        </AuthWrapper>
      </ApiWrapper>
    </div>
  );
}
