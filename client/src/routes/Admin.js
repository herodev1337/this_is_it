import React from 'react';
import { Outlet } from 'react-router';

export default function App() {
  return (
    <div>
      <p>Admin Seite</p>
      <Outlet/>
    </div>
  );
}
