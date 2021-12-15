import React, { useState } from 'react';

import styles from "styles/scss/karriere.module.scss"

const Column2 = ({ content, mouseEnter, mouseLeave }) => {
  const [active, setActive] = useState(null);
  return (
    <>
      {content.map((el, i) => (
        <div
          key={el.title}
          onClick={() => (active === i ? setActive(null) : setActive(i))}
          onMouseEnter={() => mouseEnter(i - 1)}
          onMouseLeave={() => mouseLeave(i - 1)}
          className={styles.categoryField}
        >
          <h2>{el.title}</h2>
          <p style={active === i ? {} : { display: 'none' }}>{el.content}</p>
        </div>
      ))}
    </>
  );
};

export default Column2;
