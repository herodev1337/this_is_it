import React from 'react';
import AdminDash from '../components/admin/AdminDash';

import { AuthWrapper } from '../utils/hooks/use-auth';
import { RedirectWrapper } from '../utils/RedirectWrapper';

export default function App() {
  return (
    <div>
      <AuthWrapper>
          <AdminDash />
      </AuthWrapper>
    </div>
  );
}
