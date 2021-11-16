import React from 'react';

const Column1 = ({ OnlyCat }) => {
  const creativity = 0;
  const technology = 100;
  const social = 100;
  const research = 100;
  const economy = 38;

  return (
    <div>
      <div
        className="penta"
        style={{
          clipPath: `polygon(50% ${creativity}%, ${technology}% 38%, 82% ${social}%, 18% ${research}%, 0% ${economy}%)`,
        }}
      >
        {OnlyCat.map(el => (
          <div key={el.title} id={el.title}>
            {el.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column1;
