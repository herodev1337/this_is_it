import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function PostComposer({ addPost }) {
  const [postContent, setPostContent] = useState("")
  const charlimit = 180;
  const [remainingChars, setRemainingChars] = useState(charlimit)

  useEffect(() => {
    setRemainingChars(charlimit - postContent.length)
    if (remainingChars <= 0) {
      setPostContent(postContent.slice(0, 180))
    }
  }, [postContent])

  const submitPost = (e) => {
    e.preventDefault()
    addPost({content: postContent})
    setPostContent("")
  }
  
  return (
    <div style={{margin: "15px 0"}}>
      <Card>
        <Form onSubmit={e => submitPost(e)} style={{ color: 'black' }}>
          <FloatingLabel
            controlId="floatingTextarea2"
            label={`${remainingChars} characters remaining`}
          >
            <Form.Control
              as="textarea"
              placeholder="Write your Post"
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <Button type="submit" variant="primary">
            Post
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default PostComposer;
