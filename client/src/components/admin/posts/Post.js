import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useApi } from '../../../utils/context-hooks/use-api';
import { useUser } from '../../../utils/context-hooks/use-user';

import { LikeElement } from './PostElements'

function Post({ post }) {
  const api = useApi()
  const user = useUser()

  const id = post._id
  const dateTime = new Date(post.createdAt)
  const date = dateTime.toDateString()
  const time = dateTime.toTimeString()
  const [likes, setLikes] = useState(0)

  const addLike = (liked) => { 
    setLikes(likes + liked)
    api
    .put(`./users/${user._id}/like`, liked)
    .then(function (response) {
      console.log(response.data.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <div style={{marginTop: "15px"}}>
      <Card style={{color: "black"}}>
        <Card.Header>
          {`${post.author} posted on ${date} at ${time}:`}
        </Card.Header>
        <Card.Body>
          <Card.Text>{post.postData.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <span><LikeElement addLike={addLike}/> {likes}</span> Save, Report, etc
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
