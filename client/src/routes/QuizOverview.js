import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup'
import { PencilSquare } from 'react-bootstrap-icons';
import { Outlet } from 'react-router';

const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/quizzes/',
  timeout: 1000,
  withCredentials: true,
});

import EditButtons from '../components/quiz_editor/EditButtons';

export default function App() {
  const [quizzes, setQuizzes] = useState([])
  
  useEffect(() => {
    instance
      .get('./')
      .then(function(response) {
        setQuizzes(response.data.data);
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }, [])

  const moveQuiz = (i, dir) => {
    if (i+dir >= 0 && i+dir < quizzes.length){
      let newQuizzes = [...quizzes];
      let temp = newQuizzes[i]
      newQuizzes[i] = newQuizzes[i+dir]
      newQuizzes[i+dir] = temp
      setQuizzes(newQuizzes);
    }
  }

  const trashQuiz = (i) => {
    setQuizzes(quizzes.filter((_, j)=>i!==j))
  }
  
  return (
    <div>
      <h5>{quizzes.length > 0 ? "Your Quizzes" : "nothing to show"}</h5>
      <ListGroup as="ol" numbered>
        {quizzes.map((quiz, i) => (
          <div key={"question_"+i}>
            <ListGroup.Item
              action
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {quiz.name}
                  {!quiz.isEnabled && <DashCircleDotted data-tip="disabled" data-for="warn-disabled" color="red" style={{marginLeft: "5px"}} alt="disabled"/>}
                  <ReactTooltip id="warn-disabled" place="bottom" type="warning" effect="solid" delayShow={400}/>
                </div>
                {quiz.instructions}
              </div>
              <div>
                <Badge 
                  data-tip={quiz.questions.length+` Question${quiz.questions.length===1 ? "" : "s"} in this Quiz`} 
                  data-for="questions-badge-tip" 
                  variant="primary" 
                  pill
                >
                  {quiz.questions.length}
                </Badge>
                <ReactTooltip id="questions-badge-tip" place="bottom" type="info" effect="solid" delayShow={400} />
                <PencilSquare 
                  data-tip="edit quiz" 
                  data-for="edit-quiz-tip"
                  style={{marginLeft: "5px"}}
                  cursor="pointer"
                  // onClick={()=>editQuestion(quiz, i)}
                />
                <ReactTooltip id="edit-quiz-tip" place="bottom" type="dark" effect="solid" delayShow={400} />
                <EditButtons moveItem={moveQuiz} trashItem={trashQuiz} index={i} />
              </div>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
      <Outlet quizzes={quizzes}/>
    </div>
  );
}

