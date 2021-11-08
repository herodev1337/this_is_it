import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './routes/Home';
import Quiz from './routes/Quiz';
import Knowledge from './routes/Knowledge';
import Karriere from './routes/Karriere';
import Berufsquiz from './routes/Berufsquiz';
import Berufsswiper from './routes/Berufsswiper';
import Admin from './routes/Admin';

render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/admin" element={<Admin />} />

      <Route exact path="/knowledge" element={<Knowledge />}>
        <Route exact path="karriere" element={<Karriere />} />
        <Route exact path="berufsquiz" element={<Berufsquiz />} />
        <Route exact path="berufsswiper" element={<Berufsswiper />} />
      </Route>

      <Route exact path="/games" element={<Knowledge />}>
        <Route exact path="sqit" element={<Knowledge />}>
          <Route exact path=":game" element={<Knowledge />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
