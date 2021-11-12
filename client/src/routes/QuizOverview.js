import React from 'react';
import QuizOverview from '../components/quiz/QuizOverview';

import {AuthWrapper} from '../utils/hooks/use-auth';

export default function App() {
  return (
    <div>
      <AuthWrapper>
        <QuizOverview />
      </AuthWrapper>
    </div>
  );
}
