import React from 'react';
import { Routes, Route } from 'react-router-dom';

import QuizEdior from './quiz_editor/QuizEditor'

function DashView() {
  return (
    <div>
          <Routes>
            <Route path="quiz-editor" element={<QuizEdior/>} />
          </Routes>
    </div>
  );
}

export default DashView;
