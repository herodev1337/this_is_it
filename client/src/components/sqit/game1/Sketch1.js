import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';

import get_sketch from './sketch_1';
import * as helpers from '../helpers.js';

class Sketch1 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = { p5: undefined };
  }

  // Sketch = (p) => {
  //   let x = 100;
  //   let y = 100;
  //   p.setup = () => {
  //     p.createCanvas(200, 200);
  //   };

  //   p.draw = () => {
  //     p.background(0);
  //     p.fill(255);
  //     p.rect(x, y, 50, 50);
  //   };
  // };

  resizeSketch(p5) {
    p5.resizeCanvas(helpers.realWidth(90), helpers.view_2_px(55))
  }

  componentDidMount() {
    this.setState({ p5: get_sketch(this.myRef.current) });
    window.addEventListener('resize', () => (this.resizeSketch(this.state.p5)));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => (this.resizeSketch(this.state.p5)));
  }

  render() {
    const setAnim = () => {
      this.state.p5.anim = true;
      // this.state.p5.resizeCanvas(500, 500)
    };

    return <div ref={this.myRef} onClick={setAnim}></div>;
  }
}

export default Sketch1;


const Sketch1 = () => {
  const ref = useRef()

  useEffect(() => {
    const p5 = get_sketch(ref.current)
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Sketch1

