import React from 'react';

import styles from "styles/scss/karriere.module.scss"

const Header = ({ activeTab, handleTab }) => {
  return (
    <>
      <div
        className={activeTab === 1 ? `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={() => handleTab(1)}
      >
        <h3>Kategorien</h3>
      </div>
      <div
        className={activeTab === 2 ?  `${styles.button} ${styles.buttonActive}` : styles.button}
        onClick={() => handleTab(2)}
      >
        <h3>Karriere</h3>
      </div>
    </>
  );
};

export default Header;
