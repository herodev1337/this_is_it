import React from 'react';
import ReactDOM from 'react-dom';
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
<<<<<<< HEAD
// import QuizEditor from './routes/QuizEditor';


=======
import AdminLogin from './routes/AdminLogin';
import AdminDash from './routes/AdminDash';
>>>>>>> c6678c71c55d2a42773fb2b2cca6f701b9a9d862

ReactDOM.render(
  <BrowserRouter>
    {
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/admin" element={<Admin />} >
          {/* <Route path="quiz-editor" element={<QuizEditor/>} /> */}
=======
        <Route path="/admin" element={<Admin />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dash/*" element={<AdminDash />} />
>>>>>>> c6678c71c55d2a42773fb2b2cca6f701b9a9d862
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
  </BrowserRouter>,
  document.getElementById('root')
);
