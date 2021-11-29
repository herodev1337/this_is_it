import React from 'react';
import { useParams } from "react-router-dom";

import QuizView from '../components/quiz/QuizView'


export default function Quiz() {
  let { quizId } = useParams();

  return (
    <div>
      <QuizView quizId={quizId}/>
    </div>
  );
}

