import React from 'react';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup'
import { Outlet } from 'react-router';

const quizzes = [{"id": "1", "name":"Quiz","instructions":"Intructions","isEnabled":true,"questions":[{"question":"Ja oder Nein?","answers":["1","2","3","4"],"answer":[1],"isEnabled":true,"explanation":""},{"question":"Nein oder JA!","answers":["5","6","7","8"],"answer":[0,3],"isEnabled":true,"explanation":""}]}]

export default function App() {
  return (
    <div>
      <ListGroup>
        {quizzes.map((quiz, i)=>(
          <ListGroup.Item href={"/games/quiz/"+quiz.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{quiz.name}</h5>
            </div>
            <p className="mb-1"><i>{quiz.instructions}</i></p>
            <span className="badge bg-primary rounded-pill">{quiz.questions.length}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Outlet quizzes={quizzes}/>
    </div>
  );
}

