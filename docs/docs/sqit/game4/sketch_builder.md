# game4/sketch(_builder).js

## About

This file defines the fourth SQIT game in P5.  
Learn more about P5 [here.](https://p5js.org/get-started/)

## Functions
------------------------------------

`sketch_builder($p:p5_instance) => void`

```
First we define all variables, which will be used in this function.
We also import p5 classes which just wrap simple shapes which are going to be drawn when executed.
``` 
### Important Variables
------------------------------------

`p.hardMode:boolean`
```
This variable controls the Mode, which could be equals to "unbeatable", "easy" or "normal
```

`p.playerWin:boolean`  
```
This variable controls the state of playerWin is true or not, 
if true, the Player has won,
if not, the Player has not won.
```
`p.win:boolean`  
```
This variable controls the state of win is true or not, 
if true, the KI has won,
if not, the KI has not won,
if win = 2, the game ends with a tie.
```
`p.yourTurn:boolean`  
```
This variable controls the state of yourTurn is true or not, 
if true, Player's turn,
if not, KI's turn.
```

