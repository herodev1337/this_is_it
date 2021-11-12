import React, { useState } from 'react';
import Search from '../Header, Search, Filter/Search';

const posts = [
  {
    name: 'Fiat Multipla',
    description: 'beste auto, yeah',
  },
  {
    name: 'Fiat 500',
    description: 'auch ok',
  },
  {
    name: 'brum',
    description: 'macht laut',
  },
  {
    name: 'car',
    description: 'wretz',
  },
  {
    name: 'Ford Mondeo',
    description: 'i bims cool',
  },
  {
    name: 'Ford Mondeo',
    description: 'i bims cool',
  },
];

const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter(post => {
    const postName = post.name.toLowerCase();
    return postName.includes(query.toLowerCase());
  });
};

const Career = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredPosts = filterPosts(posts, searchQuery);
  return (
    <>
      <div id="card-div">
        {filteredPosts.map(post => (
          <div className="card">
            <h2>{post.name}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </>
  );
};

export default Career;
