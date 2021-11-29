import React from 'react';
import ReactTooltip from 'react-tooltip';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { DashCircleDotted, BoxArrowUpRight } from 'react-bootstrap-icons';

import EditButtons from './EditButtons';

import "styles/scss/quiz_editor.scss"

export default function QuestionView(props) {
  const [questions, setQuestions] = [props.questions, props.setQuestions]

  function moveQuestion(_, i, dir){
    if (i+dir >= 0 && i+dir < questions.length){
      let newQuestions = [...questions];
      let temp = newQuestions[i]
      newQuestions[i] = newQuestions[i+dir]
      newQuestions[i+dir] = temp
      setQuestions(newQuestions);
    }
  }

  function trashQuestion(_, i){
    let newQuestions = [...questions];
    newQuestions.splice(i, 1);
    setQuestions(newQuestions);
  }

  function editQuestion(question, i){
    props.passEdit(question)
    trashQuestion(i)
  }

  return (
    <div style={{marginBottom: "10px"}}>
      {questions.length > 0 && <h5>Your Questions</h5>}
      <ListGroup as="ol" numbered>
        {questions.map((question, i) => (
          <div key={"question_"+i}>
            <ListGroup.Item
              action
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {question.question}
                  {!question.isEnabled && <DashCircleDotted data-tip="disabled" data-for="warn-disabled" color="red" style={{marginLeft: "5px"}} alt="disabled"/>}
                  <ReactTooltip id="warn-disabled" place="bottom" type="warning" effect="solid" delayShow={400}/>
                </div>
                {question.explanation}
              </div>
              <div>
                <Badge 
                  data-tip={question.answers.length+` Answer${question.answers.length===1 ? "" : "s"} in this Question`} 
                  data-for="answers-badge-tip" 
                  variant="primary" 
                  pill
                >
                  {question.answers.length}
                </Badge>
                <ReactTooltip id="answers-badge-tip" place="bottom" type="info" effect="solid" delayShow={400} />
                <BoxArrowUpRight 
                  data-tip="edit question" 
                  data-for="edit-question-tip"
                  style={{marginLeft: "5px"}}
                  cursor="pointer"
                  onClick={()=>editQuestion(question, i)}
                />
                <ReactTooltip id="edit-question-tip" place="bottom" type="dark" effect="solid" delayShow={400} />
                <EditButtons moveItem={moveQuestion} trashItem={trashQuestion} index={i} />
              </div>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </div>
  );
}
