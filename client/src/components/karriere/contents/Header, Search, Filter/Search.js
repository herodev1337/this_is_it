import React from 'react';

import styles from "styles/scss/karriere.module.scss"

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div id={styles.bar}>
      <form onSubmit={e => e.preventDefault()}>
        <input
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value)}
          autoComplete="off"
          type="text"
          id={styles.headerSearch}
          placeholder="Suche..."
          name="s"
        />
      </form>
    </div>
  );
};

export default Search;
