import React, { useState, useEffect } from 'react';

import PostComposer from './PostComposer';
import Post from './Post'

const axios = require('axios').default;
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  withCredentials: true,
});

function PostOverview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get('./posts')
      .then(function (response) {
        setPosts(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const addPost = (post) => {
    setPosts([...posts, post])
  }

  return (
    <div style={{maxWidth: "50%", marginLeft: "20%"}}>
      <PostComposer addPost={addPost}/>
      <div id="timeline">
        {posts.length ? posts.reverse().map((post, i) => (
          <Post key={`post_${i}`} post={post}/>
        )) : "no posts yet"}
      </div>
    </div>
  );
}

export default PostOverview;
