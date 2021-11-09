import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import QuestionEditor from './QuestionEditor';

export default function QuizEditor() {
  const [questions, setQuestions] = useState([])

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formQuizName">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control placeholder="Choose a Name for your Quiz" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuizInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control placeholder="Give Instructions for your Quiz (optional)" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnabledCheckbox">
              <Form.Check type="checkbox" label="Enabled" checked />
            </Form.Group>
          </Col>
          <Col>
            <QuestionEditor questions={questions} setQuestions={setQuestions} />
          </Col>
        </Row>
        <Row>
          <Button variant="primary" type="submit">Submit Quiz</Button>
        </Row>
      </Form>
    </div>
  );
}
