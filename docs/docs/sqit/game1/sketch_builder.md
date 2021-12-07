# game1/sketch(_builder).js

## About

This file defines the first SQIT game in P5.  
Learn more about P5 [here.](https://p5js.org/get-started/)

## Functions
------------------------------------

`sketch_builder($p:p5_instance) => void`

```
At the start of the 'sketch_builder' function we define a 'p.anim' & 'p.interval' variable.  
We also import p5 classes which just wrap simple shapes which are going to be drawn when executed.
``` 

`p.anim:boolean = false`  
```
This variable controlls the first stage of the game. 
Only when the right code was entered in the main editor do we set it to 'true'.
```

`p.interval:number = 4`  
```
This variable controlls the speed at which the lights flicker. 
The value the user enters in the editor get's passed to the p5 variable directly.
```