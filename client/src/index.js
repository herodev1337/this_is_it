import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './routes/Home';
import Quiz from './routes/Quiz';
import Knowledge from './routes/Knowledge';
import Admin from './routes/Admin';

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/admin" element={<Admin />} />

      <Route exact path="/knowledge" element={<Knowledge />} />

      <Route exact path="/games" element={<Knowledge />}>
        <Route exact path="sqit" element={<Knowledge />}>
          <Route exact path=":game" element={<Knowledge />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
