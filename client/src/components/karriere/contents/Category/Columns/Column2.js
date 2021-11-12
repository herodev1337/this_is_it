import React, { useState } from 'react';

const Column2 = ({ content }) => {
  const [active, setActive] = useState(null);
  return (
    <>
      {content.map((el, i) => (
        <div
          onClick={() => (active === i ? setActive(null) : setActive(i))}
          class="category-field"
        >
          <h2>{el.title}</h2>
          <p style={active === i ? {} : { display: 'none' }}>{el.content}</p>
        </div>
      ))}
    </>
  );
};

export default Column2;