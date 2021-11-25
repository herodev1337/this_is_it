import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { PlusLg, PencilSquare, Check2Square } from 'react-bootstrap-icons';

import EditButtons from './EditButtons';

import "styles/scss/quiz_editor.scss"

export default function AnswerEditor(props) {
  const [answers, setAnswers] = [props.answers, props.setAnswers]
  const [newAnswer, setNewAnswer] = useState("");
  const [newCorrect, setNewCorrect] = useState(false);
  const [edits, setEdits] = [props.edits, props.setEdits];

  function clickEdit(i){
    setEdits( edits.map((edit, j) => { return i===j ? !edit : edit }) )
  }

  function editAnswer(e, i){
    let newAnswers = [...answers];
    newAnswers[i].answer = e.target.value;
    setAnswers(newAnswers)
  }

  function moveAnswer(_, i, dir){
    if (i+dir >= 0 && i+dir < answers.length){
      let newAnswers = [...answers];
      let newEdits = [...edits];
      let temp = newAnswers[i]
      newAnswers[i] = newAnswers[i+dir]
      newAnswers[i+dir] = temp
      temp = newEdits[i]
      newEdits[i] = newEdits[i+dir]
      newEdits[i+dir] = temp
      setAnswers(newAnswers);
      setEdits(newEdits);
    }
  }

  function trashAnswer(_, i){
    let newAnswers = [...answers];
    let newEdits = [...edits];
    newAnswers.splice(i, 1);
    newEdits.splice(i, 1);
    setAnswers(newAnswers);
    setEdits(newEdits);
  }

  function editCorrect(e, i){
    let newAnswers = [...answers];
    newAnswers[i].correct = !newAnswers[i].correct;
    setAnswers(newAnswers)
  }

  function pushAnswer(){
    setAnswers([...answers, {answer: newAnswer, correct: newCorrect}]);
    setEdits([...edits, false])
    setNewAnswer("")
    setNewCorrect(false)
  }

  return (
    <div>
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Answer</th>
            <th>Correct</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, i) => (
            <tr key={i} id={"entry_"+i}>
              <td>{i+1}</td>
              <td><FormControl value={answer.answer} disabled={!edits[i]} onChange={e => editAnswer(e, i)} /></td>
              <td><Form.Check disabled={!edits[i]} checked={answer.correct} onChange={e => editCorrect(e, i)} /></td>
              <td>
                <span 
                  onClick={()=>clickEdit(i)}
                  style={{cursor:'pointer'}}
                >{edits[i] ? <Check2Square /> : <PencilSquare />}</span>
                {edits[i] && <EditButtons moveItem={moveAnswer} trashItem={trashAnswer} index={i} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <InputGroup>
        <FormControl value={newAnswer} placeholder="Enter a new Answer" onChange={e => setNewAnswer(e.target.value)}/>
        <InputGroup.Checkbox checked={newCorrect} onChange={()=>setNewCorrect(!newCorrect)}/>
        <Button onClick={()=>pushAnswer()}><PlusLg/></Button>
      </InputGroup>
    </div>
  );
}
