import React, { useState, useEffect } from 'react';

import PostComposer from './PostComposer';
import Post from './Post'
import { useApi } from '../../../utils/context-hooks/use-api';

function PostOverview() {
  const api = useApi()
  const [posts, setPosts] = useState([]);

  const refreshPosts = () => {
    api
      .get('./posts/')
      .then(function (response) {
        setPosts(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  useEffect(() => {
    refreshPosts()
  }, []);

  const addPost = (post) => {
    api
      .post('./posts/', post)
      .then(function (response) {
        setPosts([...posts, response.data.data.data]);
      })
      .catch(function (error) {
        console.log(error.message);
      });
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
