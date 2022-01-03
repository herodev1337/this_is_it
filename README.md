<h1 align="center">This is IT</h1>

//TODO: Description...

---


## Getting Started

#### Prerequisites

- [node + npm](https://nodejs.org/en/)
- [git](https://git-scm.com/)
- [mongodb server](https://www.mongodb.com/)


#### Clone

`git clone https://github.com/herodev1337/this_is_it.git`

or

`git clone git@github.com:herodev1337/this_is_it.git`


#### Server starten
--> [Starting the Server](./server/README.md) <--


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
│  ├─ public/	       <-- Diese Dateien werden von React generiert, hier sollte nichts verändert werden
│  ├─ src/           
│  │  ├─ components/ <-- secondary react components
│  │  ├─ routes/     <-- primary react components, included in index.tsx
│  │  ├─ static/     <-- static assets (e.g. images)
│  │  ├─ styles/     <-- SCSS files
│  │  ├─ utils/      <-- JS-files like contexts, hooks, config files, etc.
│
├─ server/           // EXPRESS REST API
│  ├─ config/        <-- Konfigurationsdateien z.B. Database Credentials und URL, Settings...
│  ├─ logs/          <-- Logdateien vom Server
│  ├─ src/ 
│  │  ├─ controller/ <-- Wandelt die Webanfragen zu Datenbankabfragen um. Verändert eventuell auch Daten
│  │  ├─ middleware/ <-- Liegt zwischen Route und Controller und kann z.B. authentifizieren
│  │  ├─ models/     <-- MongoDB Models
│  │  ├─ schema/     <-- Zod Validierungs Schemas
│  │  ├─ service/    <-- Kommuniziert direkt mit der Datenbank
│  │  ├─ utils/      <-- Hilfe-Dateien, wie z.B. Logger
│  │  ├─ routes.ts   <-- Routing-Datei
│  │  ├─ app.ts     <-- Einstiegspunkt
````
To find out how to configure the server look into [Configuration](server/README.md#Configuration)
<b>For testing, just contact me and I will send you a fully set up configuration file.</b>

#### The MERN Techstack

<figure>
  <img src="https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png" alt="mern-stack" style="width:100%">
  <figcaption>source: mongodb.com/mern-stack</figcaption>
</figure>
[Further reading](https://www.mongodb.com/languages/mern-stack-tutorial)

## React Routing

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

## API

The server-APIs for database requests, authentication, etc. are specified using the [Express.js](https://expressjs.com/) library. On the server side an API route would look something like:

`server\routes.ts`:

```typescript
import { Express, Request, Response } from 'express';
import { createBeispielHandler } from './controller/Beispiel.controller';

export default function(app: Express) {
  app.post('/api/beispiel', createBeispielHandler)
}
```


`server\controller\Beispiel.controller.ts`:
```typescript
import { Request, Response } from 'express';
import { createBeispiel } from '../service/Beispiel.service';

export async function createBeispielHandler(req: Request, res: Response) {
  try {
    const beispiel = await createBeispiel(req.body);

    return res.json(beispiel);
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
}
```

`server\service\Beispiel.service.ts`:
```typescript
import Beispiel from '../model/Beispiel.model';
import { DocumentDefinition } from 'mongoose';

export async function createBeispiel(input: DocumentDefinition<>) {
  try {
    return await Beispiel.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
```

`server\model\Beispiel.model.ts`:
```typescript
import mongoose from 'mongoose';

export interface BeispielDocument extends mongoose.Document {
  beispielString: String;
  beispielBoolean: Boolean;
  beispielObject: Object;
  /* Benötigt wenn timestamps = true */
  createdAt: Date;
  updatedAt: Date;
}

const beispielSchema = new mongoose.Schema(
  {
    beispielString: String ,
    beispielBoolean: Boolean,
    beispielObject: Object,
  },
  { timestamps: true }
);

const Beispiel = mongoose.model<BeispielDocument>('Beispiel', beispielSchema);

export default Beispiel;
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
