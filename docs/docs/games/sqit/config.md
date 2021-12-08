# config.js
------------------------------------

## About

This file is the main entry point to the p5 games. In the sketch.js the game itself is defined. Here we're defining the interactions between the p5 instance and the editor.

Learn more about the sketch_builder [here.](sketch_builder.md)

------------------------------------
## Functions

`get_sketch($ref:React.useRef, $setText1:(val:string)=>void, $setText2:(val:string)=>void)`

```javascript
get_sketch(...) => void | {
    p5:p5_instance,
    getter: (val:string)=>void
}
```

```
At the start of every 'get_sketch' we need to initializes p5 by creating a new instance defined by the 'sketch_builder' and put into the 'ref' (the div which holds the p5 canvas).  
The editorGetter function is also a must although you don't have to name it that as it's returned as 'getter' at the end anyways.

In the editorGetter you have access to the current text within the main editor and the p5 instance.  
Your task is to check the current text for things we'd like the user to type out and if successful alter the p5 game by changing p5 instance variables.

At the end we must return the p5 instance and the editorGetter as object containing the keys 'p5' & 'getter'.
``` 