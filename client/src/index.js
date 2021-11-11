import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/stylesheet.scss'

import AuthWrapper from './routes/AuthWrapper'

import Home from './routes/Home';
import Knowledge from './routes/Knowledge';
import Karriere from './routes/Karriere';
import Berufsquiz from './routes/Berufsquiz';
import Berufsswiper from './routes/Berufsswiper';
import Admin from './routes/Admin';
import Sqit from './routes/Sqit';
import QuizOverview from './routes/QuizOverview';
import Quiz from './routes/Quiz';
import AdminLogin from './routes/AdminLogin'
import AdminUser from './routes/AdminUser'



ReactDOM.render(
  <BrowserRouter>
    {
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} >
          <Route path="login" element={<AdminLogin />} />
          <Route path="user">
            <Route path=":id" element={
              <AuthWrapper>
                <AdminUser />
              </AuthWrapper>
            }/>
          </Route>
        </Route>

        <Route path="/knowledge" element={<Knowledge />}>
          <Route path="karriere" element={<Karriere />} />
          <Route path="berufsquiz" element={<Berufsquiz />} />
          <Route path="berufsswiper" element={<Berufsswiper />} />
        </Route>

        <Route path="/games">
          <Route path="sqit">
            <Route path=":game" element={<Sqit />} />
          </Route>
          <Route path="quiz" element={<QuizOverview/>}>
            <Route path=":id" element={<Quiz />}/>
          </Route>
        </Route>
      </Routes>
    }
  </BrowserRouter>,
  document.getElementById('root')
);
