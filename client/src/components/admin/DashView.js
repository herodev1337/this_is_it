import React from 'react';
import { Routes, Route } from 'react-router-dom';

import QuizEdior from './quiz_editor/QuizEditor'
import QuizOverview from '../quiz/QuizOverview'

function DashView() {
  return (
    <div>
          <Routes>
            <Route path="/quiz-editor" element={<QuizEdior/>} />
            <Route path="/quizzes" element={<QuizOverview/>} />
          </Routes>
    </div>
  );
}

export default DashView;
