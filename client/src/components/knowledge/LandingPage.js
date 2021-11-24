import React, { useEffect, useState } from 'react';
import Kategorie from './pictures/Kategorie.png';

const LandingPage = () => {
  return (
    <div id="Landing-container">
      <h1>Knowledge</h1>
      <div className="card-row">
        <div className="card" onClick={() => (window.location = '/karriere')}>
          <h2>Karriereinformationen</h2>
          <p>Erfahre mehr über mögliche Karrieren in der IT!</p>
          <img src={Kategorie} />
        </div>
      </div>
      <div className="card-row">
        <div className="card">
          <h2>Berufsquiz</h2>
          <p>Überprüfe dein Wissen zu den verschiedenen Berufen</p>
        </div>
        <div className="card">
          <h2>Berufsswiper</h2>
          <p>Welcher Beruf passt zu dir?</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
