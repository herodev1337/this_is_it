import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const axios = require('axios').default;

import "styles/scss/quiz_editor.scss"

import QuestionEditor from './QuestionEditor';
import QuestionView from './QuestionView';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/quiz/',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default function QuizEditor() {
  const [name, setName] = useState("")
  const [instructions, setInstructions] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [httpResponse, setHttpResponse] = useState("")

  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState('')
  const [explanation, setExplanation] = useState('')
  const [questionEnabled, setQuestionEnabled] = useState(true)
  const [answers, setAnswers] = useState([])
  const [edits, setEdits] = useState([]);

  function passEdit(question){
    setQuestion(question.question)
    setExplanation(question.explanation)
    setQuestionEnabled(question.isEnabled)
    setAnswers(question.answers)
    setEdits(Array(question.answers.length).fill(false))
  }

  function submitQuiz(){
    let quiz = {
      name: name,
      instructions: instructions,
      isEnabled: enabled,
      questions: questions
    }
    instance.post('./', quiz)
    .then(function (response) {
      setHttpResponse(JSON.stringify(response));
    })
    .catch(function (error) {
      setHttpResponse(error.message);
    });
  }

  return (
    <div>
      <Form id="quizEditor">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formQuizName">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control value={name} onChange={e=>setName(e.target.value)} placeholder="Choose a Name for your Quiz" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuizInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder="Give Instructions for your Quiz (optional)" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnabledCheckbox">
              <Form.Check type="checkbox" label="Enabled" checked={enabled} onChange={()=>setEnabled(!enabled)} />
            </Form.Group>
            <QuestionView questions={questions} setQuestions={setQuestions} passEdit={passEdit} />
            <Button id="submitQuiz" variant="primary" type="button" onClick={submitQuiz}>Submit Quiz</Button>
            <p>{httpResponse}</p>
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