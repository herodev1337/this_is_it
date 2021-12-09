import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';


ReactDOM.render(
  <HashRouter>
    {
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    }
  </HashRouter>,
  document.getElementById('root')
)
