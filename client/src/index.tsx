import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/stylesheet.scss';

import Home from './routes/Home';
import Knowledge from './routes/Knowledge';
import Karriere from './routes/Karriere';
import Berufsquiz from './routes/Berufsquiz';
import Berufsswiper from './routes/Berufsswiper';
import Admin from './routes/Admin';
import Sqit from './routes/Sqit';
import QuizOverview from './routes/QuizOverview';
import Quiz from './routes/Quiz';
import AdminLogin from './routes/AdminLogin';
import AdminDash from './routes/AdminDash';

import Navbar from './components/Navbar';

ReactDOM.render(
  <BrowserRouter>
    <Navbar style={{ maxHeight: '5vh' }} />
    <div style={{ maxHeight: '95vh', overflow: 'hidden' }}>
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="dash/*" element={<AdminDash />} />
          </Route>

          <Route path="/knowledge" element={<Knowledge />}>
            <Route path="berufsquiz" element={<Berufsquiz />} />
            <Route path="berufsswiper" element={<Berufsswiper />} />
          </Route>
          <Route path="/karriere" element={<Karriere />} />

          <Route path="/games">
            <Route path="sqit">
              <Route path=":game" element={<Sqit />} />
            </Route>
            <Route path="quiz/:quizId" element={<Quiz />} />
            <Route path="quiz" element={<QuizOverview />} />
          </Route>
        </Routes>
      }
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
