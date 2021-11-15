import React from 'react';

const Column1 = ({ OnlyCat }) => {
  const creativity = 0;
  const technology = 38;
  const social = 100;
  const research = 100;
  const economy = 38;

  return (
    <>
      {OnlyCat.map(el => (
        <p id={el.title}>{el.title}</p>
      ))}
      <div
        class="penta"
        style={{
          clipPath: `polygon(50% ${creativity}%, 100% ${technology}%, 82% ${social}%, 18% ${research}%, 0% ${economy}%)`,
        }}
      ></div>
    </>
  );
};

export default Column1;
