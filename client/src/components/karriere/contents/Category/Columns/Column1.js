import React from 'react';
import Pentagon from './Pentagon';

const Column1 = ({ OnlyCat, mouseEnter, mouseLeave, selected }) => {
  
  return (
    <div id="svg-container">
      <Pentagon side={250} labels={OnlyCat.map(entry => entry.title)} mouseEnter={mouseEnter} mouseLeave={mouseLeave} selected={selected} />
    </div>
  );
};

export default Column1;
