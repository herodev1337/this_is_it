import React from 'react';
import Content from './contents/Content';
import { useState } from 'react';
import Header from './contents/Header, Search, Filter/Header';

const Karriere = () => {
  // Changing active Tab
  const [activeTab, setActiveTab] = useState(1);
  const handleTab = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      <div id="karriere_header">
        <Header activeTab={activeTab} handleTab={handleTab} />
      </div>

      <div id="karriere_main_content">
        <Content activeTab={activeTab} />
      </div>
    </>
  );
};
export default Karriere;
