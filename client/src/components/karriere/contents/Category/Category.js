import React, { useState } from 'react';
import Column1 from './Columns/Column1';
import Column2 from './Columns/Column2';

import styles from "styles/scss/karriere.module.scss"

const content = [
  {
    title: 'Wozu Kategorien?',
    content: 'lorem ipsum',
  },
  {
    title: 'Kreativität',
    content: 'lorem ipsum',
  },
  {
    title: 'Technik',
    content: 'lorem ipsum',
  },
  {
    title: 'Soziales',
    content: 'lorem ipsum',
  },
  {
    title: 'Forschung',
    content: 'lorem ipsum',
  },
  {
    title: 'Wirtschaft',
    content: 'lorem ipsum',
  },
];
const OnlyCat = content.slice(1, 6);

const Category = () => {
  const [selected, setSelected] = useState(null);

  const mouseEnter = i => {
    setSelected(i);
  };

  const mouseLeave = () => {
    setSelected(null);
  };

  return (
    <>
      <div className={styles.categoryRow}>
        <div className={styles.categoryColumn} id={styles.one}>
          <Column1
            OnlyCat={OnlyCat}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            selected={selected}
          />
        </div>
        <div className={styles.categoryColumn}>
          <Column2
            content={content}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            selected={selected}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
