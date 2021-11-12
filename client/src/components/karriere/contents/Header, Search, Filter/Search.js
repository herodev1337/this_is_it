import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div id="bar">
      <form action="/" method="get">
        <input
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="i bims 1 searchbar"
          name="s"
        />
      </form>
    </div>
  );
};

export default Search;
