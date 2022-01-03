import React from 'react';
import Pentagon from './Pentagon';

import styles from "styles/scss/karriere.module.scss"

const Column1 = ({ OnlyCat, mouseEnter, mouseLeave, selected }) => {
  return (
    <div id={styles.svgContainer}>
      <Pentagon
        side={250}
        labels={OnlyCat.map(entry => entry.title)}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        selected={selected}
      />
    </div>
  );
};

export default Column1;
