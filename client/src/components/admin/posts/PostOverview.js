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
    <div>
      <div id="timeline">
        {posts.length ? posts.map((post, i) => (
          <Post post={post}/>
        )) : "no posts yet"}
      </div>
      <PostComposer addPost={addPost}/>
    </div>
  );
}

export default PostOverview;
