import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useLocation } from 'react-router';

import './quiz_view.scss';

export default function QuizView({ }) {
  const location = useLocation();
  const quiz = location.state.quiz;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleChosenAnswer = (e, i, j) => {
    const answer = quiz.questions[i].answers[j]
    e.target.className = answer.correct ? "btn btn-success" : "btn btn-danger"
  }

  return (
    <div>
      <Carousel
        activeIndex={index}
        interval={null}
        onSelect={handleSelect}
        className="min-vh-100"
      >
        <Carousel.Item>
          <div>
            <Container>
              <h1>{quiz.name}</h1>
              <h4>{quiz.instructions}</h4>
              <Button>Start Quiz</Button>
            </Container>
          </div>
        </Carousel.Item>

        {quiz.questions.map((question, i) => (
          <Carousel.Item key={i}>
            <div>
              <Container>
                <h2>{question.question}</h2>
                <h5>{question.explanation}</h5>
                <div>
                  {question.answers.map((answer, j) => (
                    <Button key={`${i}_${j}`} onClick={(e) => handleChosenAnswer(e, i, j)}>{answer.answer}</Button>
                  ))}
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}

        <Carousel.Item>Final Score</Carousel.Item>
      </Carousel>
    </div>
  );
}
