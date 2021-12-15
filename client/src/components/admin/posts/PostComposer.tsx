import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EditorJs from './EditorJs';

import { PostInterface } from './PostOverview'

function PostComposer({ addPost }: {addPost: Function}) {
  const [editor, setEditor] = useState(null)
  const [post, setPost] = useState<PostInterface>({
    title: '',
    author: '',
    description: '',
    isPublic: true,
    postData: {blocks: []},
    createdAt: Date.now(),
    likes: [],
    edits: [],
    _id: undefined,
    prevState: null
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
      .then((outputData: any) => {
        setPost({ ...post, postData: outputData, createdAt: Date.parse(outputData.time) });
      })
      .catch((error: any) => {
        console.log('Saving failed: ', error);
      });
    editor.clear();
  };

  return (
    <div style={{ margin: '15px 0' }}>
      <Card style={{color: 'black'}}>
        <EditorJs holder="composer" mount={setEditor} />
        <Button type="button" variant="primary" onClick={compilePost}>
          Post
        </Button>
      </Card>
    </div>
  );
}

export default PostComposer;
