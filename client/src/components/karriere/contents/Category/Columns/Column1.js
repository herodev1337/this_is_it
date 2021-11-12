import React from 'react';

const Column1 = ({ OnlyCat }) => {
  return (
    <>
      {OnlyCat.map(el => (
        <p id={el.title}>{el.title}</p>
      ))}
      <div class="penta"></div>
    </>
  );
};

export default Column1;
