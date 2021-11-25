import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Output from 'editorjs-react-renderer';

import { useApi } from '../../../utils/context-hooks/use-api';
import { useUser } from '../../../utils/context-hooks/use-user';

import { LikeElement, BookmarkElement } from './PostElements';

function Post({ post, saved }) {
  const api = useApi();
  const user = useUser();

  const id = post._id;
  const dateTime = new Date(post.createdAt);
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString();
  const [likes, setLikes] = useState(post.likes.length);

  const addLike = (liked) => {
    setLikes(likes + (liked ? 1 : -1));
    api
      .put(`./users/${user.getUser().db_id}/${liked ? 'like' : 'unlike'}`, { postId: id })
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    api
      .put(`./posts/${id}/${liked ? 'like' : 'unlike'}`, { userId: user.getUser().db_id })
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const addBookmark = (saved) => {
    api
      .put(`./users/${user.getUser().db_id}/${saved ? 'save' : 'unsave'}`, { postId: id })
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <Card style={{ color: 'black' }}>
        <Card.Header>
          {`${post.author} posted on ${date} at ${time}:`}
        </Card.Header>
        <Card.Body>
          <Output data={post.postData.content}/>
        </Card.Body>
        <Card.Footer>
          <span style={{marginRight: "10px"}}>
            <LikeElement addLike={addLike} userLiked={post.likes.some(like => like.userId == user.getUser().db_id)} /> {likes}
          </span>
          <span style={{marginRight: "10px"}}>
            <BookmarkElement addBookmark={addBookmark} userSaved={saved} />
          </span>
          Report, etc
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
