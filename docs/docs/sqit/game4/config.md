# game4/config.js

## About

Entry point for the first game.

Learn more about the corrosponding sketch_builder [here.](sketch_builder.md)  
Learn more about the sketch_builder, in general, [here.](../sketch_builder.md)  
Learn more about P5 [here.](https://p5js.org/get-started/)\
Learn more about Tic-Tac-Toe [here.](https://wikipedia.org/wiki/Tic-Tac-Toe) 

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
At the start of the function we define 'extraText', this variable will track if the {1,2,...,n} stage was already initialised, until the game gets interrupted by an end of the game.

First we get the value of let KI_Mode. If the value is "unbeatable", refering to the conditions of the game Tic-Tac-Toe, you can not win. If the value is "normal" or "easy", the variable hardMode will be false and you could win the game.

Next we build the P5 instance and define the 'editorGetter' function.
With every call getting the current main editor value, we get fields = [false, false, ..., n], update and validate it.
We'll stop updating and validating, if the game was interrupted by an end of the game, updating the second editor (output editor) with current following possible stages: 
    - Output: You did it!
    - Output: You did loose!
    - Output: Tie!
Is any of these stages true, if we get fields, we'll never update or validate it, but reset it with the defined variable fieldsReset, which contains the last valid value of fields.
```

