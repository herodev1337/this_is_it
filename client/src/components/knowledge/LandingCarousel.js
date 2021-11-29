import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const LandingCarousel = ({ slide }) => {
  return (
    <>
      <Carousel pauseOnHover={true}>
        {slide.map((slide, i) => (
        <Carousel.Item>
          <div className="row d-flex justify-content-center" key={i}>
            <div
              className="card"
              onClick={() => (window.location = slide.loc)}
            >
              <h2>{slide.h2}</h2>
              <p>{slide.p}</p>
              <img src= {slide.img} />
            </div>
          </div>
        </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default LandingCarousel;
