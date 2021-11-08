import React from 'react';
import p5 from 'p5';

class Sketch1 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    let x = 100;
    let y = 100;
    p.setup = () => {
      p.createCanvas(200, 200);
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default Sketch1;
