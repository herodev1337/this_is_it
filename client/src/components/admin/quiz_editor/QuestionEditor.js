import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CaretDownFill } from 'react-bootstrap-icons';

import 'styles/scss/quiz_editor.scss';

import AnswerEditor from './AnswerEditor';

export default function QuestionEditor(props) {
  const [questions, setQuestions] = [props.questions, props.setQuestions];
  const [question, setQuestion] = [props.question, props.setQuestion];
  const [explanation, setExplanation] = [
    props.explanation,
    props.setExplanation,
  ];
  const [enabled, setEnabled] = [props.enabled, props.setEnabled];
  const [answers, setAnswers] = [props.answers, props.setAnswers];
  const [edits, setEdits] = [props.edits, props.setEdits];

  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState('');
  const [transform, setTransform] = useState('up');

  useEffect(() => {
    let timer = null;
    if (open) {
      setRotate('rot-down');
      timer = setTimeout(() => {
        setTransform('down');
      }, 400);
    } else {
      setRotate('rot-up');
      timer = setTimeout(() => {
        setTransform('up');
      }, 400);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  function addQuestion(e) {
    e.preventDefault();
    let newQuestion = {
      question: question,
      answers: answers,
      isEnabled: enabled,
      explanation: explanation,
    };
    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setExplanation('');
    setEnabled(true);
    setAnswers([]);
    setEdits([]);
    setOpen(false);
  }

  return (
    <div>
      <Row>
        <Card>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formQuizName">
              <Form.Label>Question</Form.Label>
              <Form.Control
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Add a Question to your Quiz"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuizInstructions">
              <Form.Label>Explanation</Form.Label>
              <Form.Control
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Add additional Context or specify your Question (optional)"
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                Answers
                <CaretDownFill className={`${rotate} ${transform}`} />
              </div>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Enabled"
                  checked={enabled}
                  onChange={() => setEnabled(!enabled)}
                />
              </Form.Group>
            </div>
            <Collapse in={open}>
              <div>
                <AnswerEditor
                  answers={answers}
                  setAnswers={setAnswers}
                  edits={edits}
                  setEdits={setEdits}
                />
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Button variant="primary" type="button" onClick={(e) => addQuestion(e)}>
          Add Question
        </Button>
      </Row>
    </div>
  );
}
