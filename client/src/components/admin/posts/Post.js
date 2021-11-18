import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

import { useUser } from '../../../utils/context-hooks/use-user';

import { LikeElement } from './PostElements'

function Post({ post }) {
  const user = useUser();
  const time = new Date()
  const [likes, setLikes] = useState(0)

  const addLike = (liked) => { setLikes(likes + liked) }

  return (
    <div style={{marginTop: "15px"}}>
      <Card style={{color: "black"}}>
        <Card.Header>
          {`${user.getUser().username} posted on ${time.toDateString()} at ${time.toTimeString()}:`}
        </Card.Header>
        <Card.Body>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <span><LikeElement addLike={addLike}/> {likes} Save, Report, etc</span>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
