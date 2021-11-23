import React, { useState, useEffect } from 'react';

import PostComposer from './PostComposer';
import Post from './Post';
import { useApi } from '../../../utils/context-hooks/use-api';
import { useUser } from '../../../utils/context-hooks/use-user';

function PostOverview() {
  const api = useApi();
  const user = useUser();
  const [saved, setSaved] = useState([]);
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
  };

  useEffect(() => {
    if (user.getUser().db_id === null) {
      return refreshPosts();
    }
    api
      .get(`./users/${user.getUser().db_id}`)
      .then(function (response) {
        setSaved(response.data.data.savedPosts);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return refreshPosts();
  }, [user]);

  const addPost = (post) => {
    // api
    //   .post('./posts/', post)
    //   .then(function (response) {
    //     setPosts([...posts, response.data.data.data]);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
    console.log(post)
  };

  return (
    <div
      style={{
        maxWidth: '100%',
        maxHeight: '100vh',
        paddingLeft: '20%',
        paddingRight: "30%",
        overflowY: 'auto',
      }}
    >
      <PostComposer addPost={addPost}/>
      <div id="timeline">
        {posts.length
          ? [...posts].reverse().map((post, i) => {
              return (
                <Post
                  key={`post_${i}`}
                  post={post}
                  saved={saved.some((p) => p.postId === post._id)}
                />
              );
            })
          : 'no posts yet'}
      </div>
    </div>
  );
}

export default PostOverview;
