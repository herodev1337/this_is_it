import * as React from 'react';
import AdminDash from '../components/admin/AdminDash';

import RedirectWrapper from '../utils/RedirectWrapper';

export default function App() {
  return (
    <div>
      <RedirectWrapper>
        <AdminDash />
      </RedirectWrapper>
    </div>
  );
}
