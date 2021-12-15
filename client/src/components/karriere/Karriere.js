import React from 'react';
import Content from './contents/Content';
import { useState } from 'react';
import Header from './contents/Header, Search, Filter/Header';

import styles from "styles/scss/karriere.module.scss"

const Karriere = () => {
  // Changing active Tab
  const [activeTab, setActiveTab] = useState(1);
  const handleTab = tab => {
    setActiveTab(tab);
  };

  return (
    <>
      <div id={styles.karriereHeader}>
        <Header activeTab={activeTab} handleTab={handleTab} />
      </div>

      <div id={styles.karriereMainContent}>
        <Content activeTab={activeTab} />
      </div>
    </>
  );
};
export default Karriere;
