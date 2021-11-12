import React from 'react';

const Header = ({ activeTab, handleTab }) => {
  return (
    <>
      <div
        className={activeTab === 1 ? 'button active-button' : 'button'}
        onClick={() => handleTab(1)}
      >
        <h3>Kategorien</h3>
      </div>
      <div
        className={activeTab === 2 ? 'button active-button' : 'button'}
        onClick={() => handleTab(2)}
      >
        <h3>Karriere</h3>
      </div>
    </>
  );
};

export default Header;
