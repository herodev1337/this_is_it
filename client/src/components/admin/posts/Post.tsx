import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
//@ts-ignore
import Output from 'editorjs-react-renderer';

import { useApi } from '../../../utils/context-hooks/use-api';

import { LikeElement } from './PostElements';
import { PostInterface } from './PostOverview';

function Post({ post }: { post: PostInterface }) {
  const api = useApi();

  const id = post._id;
  const dateTime = new Date(post.createdAt);
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString();
  const [userLiked, setUserLiked] = useState<boolean>(null);
  const [likes, setLikes] = useState<number>(post.likes.length);

  useEffect(() => {
    api
      .get(`./post/${id}/like`)
      .then(function (response: any) {
        setUserLiked(response.data.liked)
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
  })

  const addLike = (liked: boolean) => {
    api
      .post(`./post/${id}/like`)
      .then(function (response: any) {
        console.log(response.data);
        setLikes(likes + (response.data.liked ? 1 : -1));
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <Card style={{ color: 'black' }}>
        <Card.Header>
          {`${post.author} posted on ${date} at ${time}:`}
        </Card.Header>
        {post.postData ? (
          <Card.Body>
            <Output data={post.postData} />
          </Card.Body>
        ) : (
          'No content to display'
        )}
        <Card.Footer>
          <span style={{ marginRight: '10px' }}>
            <LikeElement
              addLike={addLike}
              userLiked={userLiked}
            />{' '}
            {likes}
          </span>
          Report, etc
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
