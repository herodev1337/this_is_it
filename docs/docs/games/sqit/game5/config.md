# game5/config.js

## About

Entry point for the fifth game.

Learn more about the corrosponding sketch_builder [here.](sketch_builder.md)  
Learn more about the sketch_builder, in general, [here.](../sketch_builder.md)  
Learn more about P5 [here.](https://p5js.org/get-started/)\
Learn more about Snake [here.](wikipedia.org/wiki/Snake_(video_game_genre)) 

## Functions

---

`get_sketch($ref:React.useRef, $setText1:(val:string)=>void, $setText2:(val:string)=>void)`

```javascript
get_sketch(...) => void | {
    p5:p5_instance,
    getter: (val:string)=>void
}
```

```
At the start of the function we define the variable rotten, which controls, if rotten is true or not. If true, you could never be able to win the game, because the food is rotten and the snake can not grow. If the value of rotten is false, you could win the game and the snake can grow and the second defined variable score increases with every collect of the food by one. 


```

