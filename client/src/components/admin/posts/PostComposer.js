import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EditorJs from './EditorJs'

import { useUser } from '../../../utils/context-hooks/use-user';

function PostComposer({ addPost }) {
  const user = useUser();

  const submitPost = (e) => {
    e.preventDefault();
    addPost({
      title: 'test_post',
      author: user.username,
      description: '',
      public: true,
      postData: {
        content: 'postContent',
      },
      createdAt: Date.now(),
      likes: [],
      edits: [],
    });
  };

  return (
    <div style={{ margin: '15px 0' }}>
      <Card>
        <Form onSubmit={(e) => submitPost(e)} style={{ color: 'black' }}>
          <EditorJs holderId='composer' />
          <Button type="submit" variant="primary">
            Post
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default PostComposer;
