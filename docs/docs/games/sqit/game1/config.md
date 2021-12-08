# game1/config.js

## About

Entry point for the first game.

Learn more about the corrosponding sketch_builder [here.](sketch_builder.md) //corresponding
Learn more about the sketch_builder, in general, [here.](../sketch_builder.md)  
Learn more about P5 [here.](https://p5js.org/get-started/)

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
At the start of the function we define 'isExtraTxt', this variable will track if the second stage was already initialised.
Means, if the first challenge (settings gate="open") was completed we'll print extra text under the current text. If we check again we'll know that we already activated it.

Next we build the P5 instance and define the 'editorGetter' function.
First we determine if we look for the 'gate' or 'interval' variable, after that we prepare text for the second editor (output editor).
Then we check if the 'gate' variable is set to 'open',
if yes, add the second stage text to the editor, set 'isExtraTxt' to true and go on. //editor or main editor?
If no, set 'anim' on the p5 instance to false and return.

If the validation succeeded we get the 'interval' variable from the text and assign in to the 'interval' variable on the p5 instance.
```
