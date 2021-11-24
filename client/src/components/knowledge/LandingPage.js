import React from 'react';
import Kategorie from './pictures/Kategorie.png';
import Carousel from 'react-bootstrap/Carousel';

const LandingPage = () => {
  return (
    <div id="Landing-container">
      <h1>Knowledge</h1>
      <Carousel pauseOnHover={true}>
        <Carousel.Item>
          <div className="row d-flex justify-content-center">
            <div
              className="card"
              onClick={() => (window.location = '/karriere')}
            >
              <h2>Karriereinformationen</h2>
              <p>Erfahre mehr über mögliche Karrieren in der IT!</p>
              <img src={Kategorie} />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row d-flex justify-content-center">
            <div
              className="card"
              onClick={() => (window.location = '/knowledge/berufsquiz')}
            >
              <h2>Berufsquiz</h2>
              <p>Überprüfe dein Wissen zu den verschiedenen Berufen</p>
              <img />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row d-flex justify-content-center">
            <div
              className="card"
              onClick={() => (window.location = '/knowledge/berufsswiper')}
            >
              <h2>Berufsswiper</h2>
              <p>Welcher Beruf passt zu dir?</p>
              <img />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default LandingPage;

{
  /* <div className="card-row">
        <div className="card" onClick={() => (window.location = '/karriere')}>
          <h2>Karriereinformationen</h2>
          <p>Erfahre mehr über mögliche Karrieren in der IT!</p>
          <img src={Kategorie} />
        </div>
      </div>
      <div className="card-row">
        <div className="card" onClick={() => (window.location = '/knowledge/berufsquiz')}> 
          <h2>Berufsquiz</h2>
          <p>Überprüfe dein Wissen zu den verschiedenen Berufen</p>
          <img />
        </div>
        <div className="card" onClick={() => (window.location = '/knowledge/berufsswiper')}>
          <h2>Berufsswiper</h2>
          <p>Welcher Beruf passt zu dir?</p>
          <img />
        </div>
      </div> */
}
