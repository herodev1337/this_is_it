import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { PencilSquare } from 'react-bootstrap-icons';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import EditButtons from '../admin/quiz_editor/EditButtons';

import { useAuth } from '../../utils/context-hooks/use-auth'

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true
});

import '../../styles/scss/quiz_overview.scss';

export default function QuizOverview() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api
      .get('./quiz')
      .then(function (response) {
        setQuizzes(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const moveQuiz = (e, i, dir) => {
    e.stopPropagation()
    if (i + dir >= 0 && i + dir < quizzes.length) {
      let newQuizzes = [...quizzes];
      let temp = newQuizzes[i];
      newQuizzes[i] = newQuizzes[i + dir];
      newQuizzes[i + dir] = temp;
      setQuizzes(newQuizzes);
    }
  };

  const trashQuiz = (e, i) => {
    e.stopPropagation()
    setQuizzes(quizzes.filter((_, j) => i !== j));
  };

  const editQuiz = (e, quiz, i) => {
    e.stopPropagation()
    navigate('/admin/dash/quiz-editor', { state: { quiz: quiz } })
  }

  return (
    <div
      id="quiz-overview"
      className="d-flex justify-content-center align-content-center"
    >
      <div>
        <h5>{quizzes.length > 0 ? 'Your Quizzes' : 'nothing to show'}</h5>
        <ListGroup as="ol" numbered>
          {quizzes.map((quiz, i) => (
            <div key={'question_' + i}>
              <ListGroup.Item
                action
                as="li"
                className="d-flex justify-content-between align-items-start"
                style={{cursor: 'pointer'}}
                onClick={()=>navigate(`/games/quiz/${quiz._id}`, { state: { quiz: quiz } })}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {quiz.name}
                    {!quiz.isEnabled && (
                      <DashCircleDotted
                        data-tip="disabled"
                        data-for="warn-disabled"
                        color="red"
                        style={{ marginLeft: '5px' }}
                        alt="disabled"
                      />
                    )}
                    <ReactTooltip
                      id="warn-disabled"
                      place="bottom"
                      type="warning"
                      effect="solid"
                      delayShow={400}
                    />
                  </div>
                  {quiz.instructions}
                </div>
                <div>
                  <Badge
                    data-tip={
                      quiz.questions.length +
                      ` Question${
                        quiz.questions.length === 1 ? '' : 's'
                      } in this Quiz`
                    }
                    data-for="questions-badge-tip"
                    variant="primary"
                    pill
                  >
                    {quiz.questions.length}
                  </Badge>
                  <ReactTooltip
                    id="questions-badge-tip"
                    place="bottom"
                    type="info"
                    effect="solid"
                    delayShow={400}
                  />
                  {auth.checkLocalSession() ? (
                    <PencilSquare
                      data-tip="edit quiz"
                      data-for="edit-quiz-tip"
                      style={{ marginLeft: '5px' }}
                      cursor="pointer"
                      onClick={(e)=>editQuiz(e, quiz, i)}
                    />
                  ) : (
                    <></>
                  )}
                  <ReactTooltip
                    id="edit-quiz-tip"
                    place="bottom"
                    type="dark"
                    effect="solid"
                    delayShow={400}
                  />
                  {auth.checkLocalSession() ? (
                    <EditButtons
                      moveItem={moveQuiz}
                      trashItem={trashQuiz}
                      index={i}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </div>
      <Outlet quizzes={quizzes} />
    </div>
  );
}
