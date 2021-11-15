import React from 'react';
import Login from '../components/admin/Login';

import { AuthWrapper } from '../utils/hooks/use-auth';

export default function App() {
  return (
    <div>
      <Login />
    </div>
  );
}
