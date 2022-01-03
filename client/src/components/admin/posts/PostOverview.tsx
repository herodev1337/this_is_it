import * as React from 'react';
import { useState, useEffect } from 'react';

import PostComposer from './PostComposer';
import Post from './Post';
import { useApi } from '../../../utils/context-hooks/use-api';

export interface PostInterface{
  title: string,
  author: string,
  description: string,
  isPublic: boolean,
  postData: {blocks: object[]},
  createdAt: string | number | Date,
  likes: object[],
  edits: object[],
  _id: string,
  prevState: null
}

function PostOverview() {
  const api = useApi();
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const refreshPosts = () => {
    api
      .get('./post/')
      .then(function (response: any) {
        setPosts(response.data);
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    // if (user.getUser().db_id === null) {
    //   return refreshPosts();
    // }
    return refreshPosts();
  }, []);

  const addPost = (post: PostInterface) => {
    console.log("New Post:", post)
    setPosts([...posts, post])
    api
      .post('./post/', post)
      .then(function (response: any) {
        setPosts([...posts, response.data]);
      })
      .catch(function (error: any) {
        console.log(error.message);
      });
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
                />
              );
            })
          : 'no posts yet'}
      </div>
    </div>
  );
}

export default PostOverview;
