# sketch(_builder).js

## About

This file defines the P5 game and all it's inner workings.  
We expose instance variables here to alter the state of P5 somewhere above in the code.

Learn more about P5 [here.](https://p5js.org/get-started/)

## Functions
------------------------------------

`sketch_builder($p:p5_instance) => void`

```
The sketch_builder function gets passed to the new P5 instance above and needs to define a 'p.setup' & 'p.draw' method.

In this function you'll create your p5 game. The 'draw' methods gets called 60 times a second and is the actual worker.  
(Follow the link above if you need to know more about P5, especially when you don't know what's going on with the draw function.)

To control the p5 game you'll need to expose some variables on the p5 instance, these can be changed or called outside of the 'sketch_builder'.

There is also a 'customResize' method that can be defined if you need extra stuff to happen when resize events are fired.
``` 