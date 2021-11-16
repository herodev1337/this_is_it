import React from 'react';
import { Routes, Route } from 'react-router-dom';

import QuizEdior from './quiz_editor/QuizEditor';
import QuizOverview from '../quiz/QuizOverview';
import PostOverview from './posts/PostOverview';
import UserOverview from './users/UserOverview';

function DashView() {
  return (
    <div>
      <Routes>
        <Route path="/posts" element={<PostOverview />} />
        <Route path="/users" element={<UserOverview />} />
        <Route path="/quizzes" element={<QuizOverview />} />
        <Route path="/quiz-editor" element={<QuizEdior />} />
      </Routes>
    </div>
  );
}

export default DashView;
