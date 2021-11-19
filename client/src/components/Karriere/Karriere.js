import React from 'react';
import Pentagon from './Pentagon';

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
const labels = content.slice(1, 6).map(entry => entry.title);

function Karriere() {
  return (
    <div style={{boxSizing: 'border-box', display: 'flex'}}>
      <div
        style={{ border: '1px blue solid', width: '300px', height: '300px' }}
      >
      </div>
      <Pentagon side={300} labels={labels} />
    </div>
  );
}

export default Karriere;
