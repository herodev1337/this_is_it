import Category from './Category/Category';
import Career from './Career/Career';
import React from 'react';

const Content = ({ activeTab }) => {
  if (activeTab === 1) {
    return <Category />;
  }
  return <Career />;
};
export default Content;
