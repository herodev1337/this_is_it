import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CaretRightFill, CaretDownFill, Display } from 'react-bootstrap-icons';

import "styles/scss/quiz_editor.scss"

import AnswerEditor from './AnswerEditor'

export default function QuestionEditor(props) {
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState('')
  const [transform, setTransform] = useState('up')
  const [question, setQuestion] = useState('')
  const [explanation, setExplanation] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = [props.questions, props.setQuestions]

  useEffect(() => {
    let timer = null
    if (open) {
      setRotate('rot-down')
      timer = setTimeout(()=>{
        setTransform('down')
      }, 400)
    } else {
      setRotate('rot-up')
      timer = setTimeout(()=>{
        setTransform('up')
      }, 400)
    }
    return () => { clearTimeout(timer) }
  }, [open])

  function submit(e){
    e.preventDefault();
    let newQuestion = {
      question: question,
      answers: [],
      answer: [],
      isEnabled: enabled,
      explanation: explanation
    }
    answers.forEach((answer, i)=>{
      newQuestion.answers.push(answer.answer)
      if (answer.correct){ newQuestion.answer.push(i) }
    })
    setQuestions([...questions, newQuestion]);
  }

  return (
    <div>
      <Form onSubmit={e => submit(e)}>
        <Row>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3" controlId="formQuizName">
                <Form.Label>Question</Form.Label>
                <Form.Control 
                  value={question}
                  onChange={e => setQuestion(e.target.value)} 
                  placeholder="Add a Question to your Quiz" 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formQuizInstructions">
                <Form.Label>Explanation</Form.Label>
                <Form.Control 
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  placeholder="Add additional Context or specify your Question" 
                />
              </Form.Group>
              <Card.Text >
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                  <div onClick={()=>setOpen(!open)} style={{cursor:'pointer'}}> 
                    Answers 
                    <CaretRightFill className={`${rotate} ${transform}`}/>
                  </div>
                  <Form.Group>
                    <Form.Check type="checkbox" label="Enabled" checked={enabled} onChange={()=>setEnabled(!enabled)} />
                  </Form.Group>
                </div>
              </Card.Text>
              <Collapse in={open}>
                <div>
                  <AnswerEditor answers={answers} setAnswers={setAnswers} />
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Button variant="primary" type="submit">Add Question</Button>
        </Row>
        <p>{JSON.stringify(questions[0])}</p>
      </Form>
    </div>
  );
}
