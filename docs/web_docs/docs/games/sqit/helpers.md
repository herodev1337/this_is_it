# helpers.js

## About

This file is a collection of usefull functions which will be used in different files.

## Functions
------------------------------------

`realWidth($percent:number)`

```javascript
real_width(...) => number
```

```
This function converts a percentage into a pixel value based of the window width.
```

------------------------------------
`view_2_px($vh:number, $height:boolean=true)`

```javascript
view_2_px(...) => number
```

```
This function converts view units into pixels. The second arguments determens if height or width should be calculated. 
```

------------------------------------
`get_userCode($codeStr:string, $tarVar:string)`

```javascript
get_userCode(...) => [string, boolean]
```

```
This function tries to get a value from an variable inside an code text.
We will construct a function by appending a return statement to the given text ($codeStr) which returns the given variable ($tarVar).
We then try to execute the constructed function and save it's result. We also catch if any error happens (eg. because of bad code).
We return the result, either the result of the constructed function or the error, plus an status message indicating if we run into an error as an array.

This whole process should be worked out as iframe for the future. This whole process is way to unsecure to be actually released. Sry :/
```

------------------------------------
`get_validation($codeStr:string, $validator:string, $variable:string)`

```javascript
get_validation(...) => boolean
```

```
This function tries to validate a given code text by using the 'get_userCode' function and comparing the returned value with the given $validator value. 
```