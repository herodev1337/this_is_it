import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EditorJs from './EditorJs';

import { useUser } from '../../../utils/context-hooks/use-user';

function PostComposer({ addPost }) {
  const user = useUser();
  const [editor, setEditor] = useState(null)
  const [post, setPost] = useState({
    title: 'test_post',
    author: user.username,
    description: '',
    public: true,
    postData: {blocks: []},
    createdAt: undefined,
    likes: [],
    edits: [],
  });

  useEffect(() => {
    if (post.postData.blocks.length) {
      addPost(post);
      return setPost({ ...post, postData: {blocks: []} });
    }
  }, [post]);

  const compilePost = () => {
    editor
      .save()
      .then((outputData) => {
        setPost({ ...post, postData: outputData, createdAt: Date(outputData.time) });
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
    editor.clear();
  };

  return (
    <div style={{ margin: '15px 0' }}>
      <Card style={{color: 'black'}}>
        <EditorJs holderId="composer" mount={setEditor} />
        <Button type="button" variant="primary" onClick={compilePost}>
          Post
        </Button>
      </Card>
    </div>
  );
}

export default PostComposer;
