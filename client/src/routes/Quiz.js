import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import { useParams } from "react-router-dom";

export default function Quiz(props) {
  let params = useParams();

  return (
    <div>
      <Carousel>

      </Carousel>
      {JSON.stringify(props.quizzes)}
    </div>
  );
}

