# Editor.jsx

## About

Editor.js holds the AceEditor components and is the main component for all sqit games editors.

It's comprised of 2 components, just 2 ace editor components. The first is the main component where the user will type everything.
The second is a small, read-only editor right underneath the main one and is used as an output window to display possible errors or messages used to inform the player.

## Functions

---

`getEditorSizes()`

```javascript
getEditorSizes() => [[number,number], [number,number]]
```

```
This functions initializes the editor sizes as a react state of nested arrays.
We useLayoutEffect here to wait for the ui to load in first. We than grab the acutal width and height of both editors and return them. We also register an event listener for the resize event to update the sizes of both editors.
```

---

`Editor({$setter1:string, $setter2:string, $getter:(val:string)=>void})`

```
Main Editor Component.

There is a main div holding both editor instances the rest is managed by AceEditor. We only supply 2 things.

2 Setters strings which will go into the 'value' property of both editor instances.  
These will be watched and updated by react when we call the setText1/2 functions somewhere else in the code. These allow us to control what's going on in the editors.

1 Getter function which will go into the 'onChange' event on the first/main editor.  
This function gets called when the user types something into the main editor. The value it supplies will be all the text in the main editor.
```
