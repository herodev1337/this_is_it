import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router';

import 'styles/scss/quiz_editor.scss';

import QuestionEditor from './QuestionEditor';
import QuestionView from './QuestionView';

const axios = require('axios').default;
const apiQuiz = axios.create({
  baseURL: 'http://localhost:3000/api/quizzes/',
  timeout: 1000,
  withCredentials: true,
});

export default function QuizEditor() {
  const location = useLocation();
  let initialQuiz = {
    name: '',
    instructions: '',
    isEnabled: true,
    questions: [],
  }
  if (location.state) {
    if (location.state.quiz) {
      initialQuiz = location.state.quiz
    } else {
      if (location.state.from.state.quiz) {
        initialQuiz = location.state.from.state.quiz
      }
    }
  }

  const [name, setName] = useState(initialQuiz.name);
  const [instructions, setInstructions] = useState(initialQuiz.instructions);
  const [enabled, setEnabled] = useState(initialQuiz.isEnabled);
  const [httpResponse, setHttpResponse] = useState('');

  const [questions, setQuestions] = useState(initialQuiz.questions);
  const [question, setQuestion] = useState('');
  const [explanation, setExplanation] = useState('');
  const [questionEnabled, setQuestionEnabled] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [edits, setEdits] = useState([]);

  function passEdit(question) {
    setQuestion(question.question);
    setExplanation(question.explanation);
    setQuestionEnabled(question.isEnabled);
    setAnswers(question.answers);
    setEdits(Array(question.answers.length).fill(false));
  }

  function submitQuiz() {
    let quiz = {
      name: name,
      instructions: instructions,
      isEnabled: enabled,
      questions: questions,
    };
    if (location.state) {
      apiQuiz
        .put(`./${location.state.quiz._id}`, quiz)
        .then(function (response) {
          console.log(response);
          setName('');
          setInstructions('');
          setEnabled(true);
          setQuestions([]);
        })
        .catch(function (error) {
          console.log(error.response.data.error)
          setHttpResponse(error.message);
        });
    } else {
      apiQuiz
        .post('./', quiz)
        .then(function (response) {
          console.log(response);
          setName('');
          setInstructions('');
          setEnabled(true);
          setQuestions([]);
        })
        .catch(function (error) {
          console.log(error.response.data.error)
          setHttpResponse(error.message);
        });
    }
  }

  return (
    <div id="quizEditor">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formQuizName">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Choose a Name for your Quiz"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuizInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Give Instructions for your Quiz (optional)"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnabledCheckbox">
              <Form.Check
                type="checkbox"
                label="Enabled"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
            </Form.Group>
            <QuestionView
              questions={questions}
              setQuestions={setQuestions}
              passEdit={passEdit}
            />
            <Button
              id="submitQuiz"
              variant="primary"
              type="button"
              onClick={submitQuiz}
            >
              Submit Quiz
            </Button>
            <span>{httpResponse}</span>
          </Col>
          <Col>
            <QuestionEditor
              questions={questions}
              setQuestions={setQuestions}
              question={question}
              setQuestion={setQuestion}
              explanation={explanation}
              setExplanation={setExplanation}
              enabled={questionEnabled}
              setEnabled={setQuestionEnabled}
              answers={answers}
              setAnswers={setAnswers}
              edits={edits}
              setEdits={setEdits}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
