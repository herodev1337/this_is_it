import React, { useState } from 'react';
import Search from '../Header, Search, Filter/Search';

const posts = [
  {
    name: 'Game Designer',
    description: '',
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
    name: 'looooooooreeee',
    description: 'baaaaa',
  },
  {
    name: 'Tooor',
    description: 'hihi',
  },
  {
    name: 'Fachinformatiker',
    description: 'swag',
  },
  {
    name: 'Anwendungen',
    description: 'cool',
  },
  {
    name: 'React',
    description: 'reaktiv',
  },
  {
    name: 'Comic Sans TM',
    description: 'best font',
  },
  {
    name: 'Thinkbook',
    description: 'teuer',
  },
  {
    name: 'Sqit',
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
  const query = document.getElementsByName('s').value;
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredPosts = filterPosts(posts, searchQuery);
  return (
    <div id="career">
      <div id="search">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div id="card-div">
        {filteredPosts.map(post => (
          <div className="card" key={post.name}>
            <div className="card-inner">
              <div className="card-front">
                <h2>{post.name}</h2>
              </div>
              <div className="card-back">
                <p>{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
