import * as React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
//@ts-ignore
import Output from 'editorjs-react-renderer';

import { useApi } from '../../../utils/context-hooks/use-api';

import { LikeElement } from './PostElements';
import { PostInterface } from './PostOverview';

function Post({ post, saved }: { post: PostInterface; saved: boolean }) {
  const api = useApi();

  const id = post._id;
  const dateTime = new Date(post.createdAt);
  const date = dateTime.toDateString();
  const time = dateTime.toTimeString();
  const [likes, setLikes] = useState<number>(post.likes.length);

  const addLike = (liked: boolean) => {
    api
      .post(`./post/${id}/like`)
      .then(function (response: any) {
        console.log(response.data);
        setLikes(likes + (liked ? 1 : -1));
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
              userLiked={post.likes.some(
                (like: any) => like.userId == ''//user.getUser().db_id
              )}
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
