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
At the start of the function we define the variable rotten, which controls, if the food is rotten or not. We'll await true, to end the game. If false, we'll never could end the game, because the snake will not grow.



```

