import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/stylesheet.scss';

import Home from './routes/Home';
import Admin from './routes/Admin';
import QuizOverview from './routes/QuizOverview';
import Quiz from './routes/Quiz';
import AdminLogin from './routes/AdminLogin';
import AdminDash from './routes/AdminDash';

ReactDOM.render(
  <BrowserRouter>
    {
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dash/*" element={<AdminDash />} />
        </Route>

        {/* <Route path="/knowledge" element={<Knowledge />}>
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
        </Route> */}
      </Routes>
    }
  </BrowserRouter>,
  document.getElementById('root')
);
