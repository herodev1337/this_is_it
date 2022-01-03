import React from 'react';
import Kategorie from './pictures/Kategorie.png';
import LandingCarousel from './LandingCarousel';

const slide = [
  {
    loc: '/karriere',
    h2: 'Karriereinformationen',
    p: 'Erfahre mehr über mögliche Karrieren in der IT!',
    img: Kategorie
  },
  {
    loc: '/knowledge/berufsquiz',
    h2: 'Berufsquiz',
    p: 'Überprüfe dein Wissen zu den verschiedenen Berufen',
    img: '',
  },
  {
    loc: '/knowledge/berufsswiper',
    h2: 'Berufsswiper',
    p: 'Welcher Beruf passt zu dir?',
    img: '',
  },
];

const LandingPage = () => {
  return (
    <div id="Landing-container">
      <LandingCarousel slide={slide} />
    </div>
  );
};

export default LandingPage;
