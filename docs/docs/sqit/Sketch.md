# Sketch1.jsx

## About

Sketch1.js is the main entry point for the client. Everytime the sqit url gets called this React component is returned.

This component builds on P5.js as drawing utility for the canvas (our animations) and AceEditor.js as text editor on the page.

It loads, based on the given url, dynamically the needed P5 Sketch and AceEditor instance.

## Functions

---

`import_sketch($page:string)`

```javascript
import_sketch(...) => void | {
    text1:string,
    text2:string,
    get_sketch:(ref:React.useRef,
               (val:string)=>void, 
               (val:string)=>void) => void | {
                   p5:p5_instance,
                   getter: (val:string)=>void
                }
    }
```

```
Imports the P5 sketch based on the given string.

(We assume the imported config has a default export which is our 'get_sketch' function and 2 strings named 'ed1_txt' & 'ed2_txt'.)

We build a little regex to see if game1 to 6 match '$page'.
If not, we return the hell out of here.
If yes, require the needed config.js from the path associated with '$page'.
Then we return an object with the keys 'get_sketch, text1, text2' and there corrosponding function/strings.
```

---

`Sketch1()`

Learn more about the editor [here.](Editor.md)  
Learn more about the p5 implementation [here.](config.md)

```
Main SQIT Component.

It's one big div that contains 2 divs holding a canvas element and 2 aceditor instances. The aceeditor instances are splitted into the main editor for text input and an output editor which is right under the main editor.

At the start we get the corrosponding sketch and initial text1/2.
After that we get a react reference which will go into our p5 parent div (the div which will hold the p5 canvas element later).
We also get 2 react states. They will represent the 2 texts that will go into the AceEditor instances.

We also create a new state that will hold the p5 instance and a function that will be called by the first ace editor instance.

In the useEffect hook we'll get our p5 instance and our text getter.
We also register some event listeners which will resize the canvas on resize events.
If a customResize property exists on the p5 instance we will also call that. It represents some custom resize functionality if needed.

The returned component calls the <Editor> which in fact creates 2 ace editor instances which will get the text1/2 state as value.
It also creates a div which will get our p5Ref and will hold the canvas element in the future.
If the setText1/2 gets used in the future it will update these components.
The getter gets called when the onChange event on the main ace editor gets fired (eg. if you type anything in the editor). It will receive the whole text of the editor in one string and we have to process it in the corrosponding config.
```
