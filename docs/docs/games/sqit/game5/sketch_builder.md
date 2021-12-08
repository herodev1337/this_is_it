# game5/sketch(_builder).js

## About

This file defines the fifth SQIT game in P5.  
Learn more about P5 [here.](https://p5js.org/get-started/)

## Functions
------------------------------------

`sketch_builder($p:p5_instance) => void`

```
First we define all variables, which will be used in this function.
We also import p5 classes, which just wrap simple shapes, which are going to be drawn when executed.
``` 
### Important Variables
------------------------------------

`p.score:number`
```
This variable controls the amount of times the snake ate food. The game will end if score reaches 10.
```

`p.snake:snake_instance` 
```
This variable creates a new snake with the class snake.
```
## Classes 
------------------------------------

`class Snake`

```
Interacting with methods in this defined class, gives you every functioning of the current active snake.
```

