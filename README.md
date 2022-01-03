<h1 align="center">This is IT</h1>

//TODO: Description...

---



## Getting Started

#### Prerequisites

- [node.js](https://nodejs.org/en/)
  - npm



#### Clone

`git clone https://github.com/herodev1337/this_is_it.git`

or

`git clone git@github.com:herodev1337/this_is_it.git`



#### Starting the server

1. `cd this_is_it/server`
2. `npm install` **or** `npm i` (only after the first pull/clone)
3. `npm run dev`
4. The dev-server should start!



#### Starting the React-Devserver

1. `cd this_is_it/client`
2. `npm install` **or** `npm i` (only after the first pull/clone)
3. `npm start`
4. Wait for Webpack to compile the development-server



## Development

#### Folder Structure

````
this_is_it/
├─ client/           // REACT WEBSERVER
│  ├─ public/	     <-- files generated by react, you shouldn't need to touch these
│  ├─ src/           
│  │  ├─ components/ <-- secondary react components
│  │  ├─ routes/     <-- primary react components, included in index.tsx
│  │  ├─ static/     <-- static assets (e.g. images)
│  │  ├─ styles/     <-- SCSS files
│  │  ├─ utils/      <-- JS-files like contexts, hooks, config files, etc.
│
├─ server/           <-- TypeScript Rest API server
│  ├─ config/        <-- Configuration files
│  ├─ src/           
│  │  ├─ controller/ <-- Handles requests coming from express
│  │  ├─ middleware/ <-- Each request goes through it. A middleware e.g. logs a request or validates inputs from forms
│  │  ├─ model/      <-- Defines on how a "Document" looks for mongoose (e.g UserDocument)
│  │  ├─ schema/     <-- Defines a schema for zod. Zod validates the input the user gives
│  │  ├─ service/    <-- Creates a connection between database and controller
│  │  ├─ utils/      <-- Small functions that get called often 
│  │  ├─ routes.ts   <-- Defines all routes for express
│  │  ├─ app.ts      <-- Starts the express server, connects with the database and initializes some more components
````
To find out how to configure the server look into [Configuration](server/README.md#Configuration)
<b>For testing, just contact me and I will send you a fully set up configuration file.</b>

#### The MERN Techstack

<figure>
  <img src="https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png" alt="mern-stack" style="width:100%">
  <figcaption>source: mongodb.com/mern-stack</figcaption>
</figure>
[Further reading](https://www.mongodb.com/languages/mern-stack-tutorial)

#### React Routing

The website is a single-page-application, i.e. no separate HTML-files will be loaded. Rather, react will render and re-render the necessary components on the same page. To still enable URL based navigation we use the [React Router](https://reactrouter.com/docs/en/v6) **v6** library.

Create a new route by adding a respective entry to `client\src\index.js`:

```react
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ...
import ParentComponent from './routes/ParentComponent';
import ChildComponent from './routes/ChildComponent';
<BrowserRouter>
  {
    <Routes>
      ...
      <Route path="/parent" element={<ParentComponent/>}>
        <Route path="child" element={<ChildComponent/>} />
      </Route>
    </Routes>
  }
</BrowserRouter>
```

The parent route's address is `localhost:8080/parent` and the child route's is `localhost:8080/parent/child`. For `<ChildComponent/>` to be displayed, the location has to be specified in `<ParentComponent />`. This is accomplished using the `<Outlet/>` component:

```react
import React from 'react';
import { Outlet } from 'react-router-dom';
function ParentComponent() {
  return (
    <div>
      ...
      <Outlet />
    </div>
  );
}
export default ParentComponent;
```

The *Nesting* shown above is optional but recommended to keep the routing- and page structure clear and intuitive. All components used in `client\src\index.js` should be placed in `client\src\routes\`. The subcomponents used therein go into an according folder inside `client\src\components\`.

#### API

The server-APIs for database requests, authentication, etc. are specified using the [Express.js](https://expressjs.com/) library. On the server side an API route would look something like:

`server\server.js`:

```js
const express = require('express');
const app = express();
...
app.use('/api/example/', require('./routes/exampleApi.route'))
```
`server\routes\exampleApi.route.js`:

```js
const router = require('express').Router();
const exampleController = require('../controllers/exampleApi.controller');

router
  .route('/')
  .get(exampleController.getExampleView)
  ...
router
  .route('/:exampleId')
  .get(exampleController.getExample)
  .post(/*optional middleware*/ exampleController.createExample)
  ...
...
module.exports = router;
```
`server\controllers\exampleApi.controller.js`:
```js
const example = require("../models/example");

//* GET - /api/example/
const getExampleView = (req, res, next) => {
  Quiz.find({/* OPTIONS */}).then(data => { 
    // Handle Data
  }).catch(error => {
    // Handle Error
  })
}
...
module.exports = {
  getExampleView,
  ...
};
```

Client side API requests are sent via the [Axios](https://axios-http.com/) library. For this purpose, we have already prepared a react context with the fully configured Axios-instance. To make the context available (*provide*) the component from which the HTTP request is sent has to be placed inside the wrapper from `client\src\utils\context-hooks\use-api.js`. Based on the above example:

```react
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApiWrapper } from '../utils/context-hooks/use-api';
function ParentComponent() {
  return (
    <div>
      <ApiWrapper>
        ...
        <Outlet />
      <ApiWrapper>
    </div>
  );
}
export default ParentComponent;
```

Within the wrapper, i.e. in `<ChildComponent/>`, the context can now be used (*consumed*) using the `useApi`-hook:

```react
import React, { useState, useEffect } from 'react';
import { useApi } from '../utils/context-hooks/use-api';
function ChildComponent() {
  const api = useApi();
  const [content, setContent] = useState();

  useEffect(() => {
  api.get('./example/')
    .then(function (response) {
      setContent(response.data) // exact usage depends on the data structure of the HTTP-response
    })
    .catch(function (error) {
      // handle error
    });
  }, [])
    
  return (
    <div>
      {content.map((example, i) => {
        // display the contents
      })};
    </div>
  );
}
export default ParentComponent;
```

#### Styling

//TODO: Styling has to get modularized! The stylesheets are cross-contaminating at the moment.
