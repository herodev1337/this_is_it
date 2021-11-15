import React, { useState } from 'react';
import Column1 from './Columns/Column1';
import Column2 from './Columns/Column2';

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
  return (
    <>
      <div className="category-row">
        <div className="category-column">
          <Column1 OnlyCat={OnlyCat} />
        </div>
        <div className="category-column">
          <Column2 content={content} />
        </div>
      </div>
    </>
  );
};

export default Category;
