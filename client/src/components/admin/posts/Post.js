import React from 'react';
import Card from 'react-bootstrap/Card';

function Post({ post }) {
  return (
    <div>
      <Card style={{color: "black"}}>
        <Card.Header>
          {`{username} posted on {date}:`}
        </Card.Header>
        <Card.Body>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <span>Like, Save, Report, etc</span>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
