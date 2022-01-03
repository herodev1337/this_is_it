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

oder

`git clone git@github.com:herodev1337/this_is_it.git`


#### Server starten
--> [Starting the Server](./server/README.md) <--


#### React Devserver starten

1. `cd this_is_it/client`
2. `npm install` **oder** `npm i` (nur nach dem ersten pull/clone)
3. `npm start`
4. Etwas warten, Webpack kompiliert euch den den Development-Server


## Development

#### Ordnerstruktur

````
this_is_it/
├─ client/           // REACT WEBSERVER
│  ├─ public/	       <-- Diese Dateien werden von React generiert, hier sollte nichts verändert werden
│  ├─ src/           
│  │  ├─ components/ <-- Sekundäre React-Komponenten
│  │  ├─ routes/     <-- Primäre React-Komponenten, die in index.js verwendet werden
│  │  ├─ static/     <-- Statische Assets, wie z.B. Bilder
│  │  ├─ styles/     <-- (S)CSS Dateien
│  │  ├─ utils/      <-- JS-Dateien wie Contexts, Hooks, Konfigurationsdateien, etc.
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

#### Der MERN Techstack

<figure>
  <img src="https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png" alt="mern-stack" style="width:100%">
  <figcaption>Quelle: mongodb.com/mern-stack</figcaption>
</figure>

Zum [Nachlesen](https://www.mongodb.com/languages/mern-stack-tutorial)

## React Routing

Die Website ist eine Single-Page-Application, d.h. es werden keine separaten HTML-Files geladen, sondern React rendert die benötigten Komponenten immer auf der selben Seite. Um dennoch gezielt navigieren zu können, nutzen wir die [React Router](https://reactrouter.com/docs/en/v6) **v6** library.

Zum Erstellen einer neue Route muss in `client\src\index.js` ein entsprechender Eintrag eingefügt werden:

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

Die Parent-Route wäre dann über `localhost:8080/parent` zu erreichen, die Child-Route über `localhost:8080/parent/child`. Damit `<ChildComponent/>` angezeigt werden kann, muss in `<ParentComponent />` spezifiziert werden, an welcher Stelle; dies geschieht mit der `<Outlet/>` Komponente:

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

Das oben gezeigte *Nesting* ist optional aber empfohlen, um die Seiten- und Routerstruktur intuitiv und übersichtlich zu halten. Alle in `client\src\index.js` verwendeten Komponenten sollten in dem Ordner `client\src\routes\` liegen. Die darin verwendeten Sub-Komponenten kommen in einen entsprechenden Ordner in `client\src\components\`.

## API

Die Server-APIs für Datenbankabfragen, Authentifizierung usw. werden mit [Express.js](https://expressjs.com/) spezifiziert. Serverseitig würde eine API-Route beispielsweise folgendermaßen aussehen:

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

Client-seitig werden API-Requests mit [Axios](https://axios-http.com/) durchgeführt. Hierfür gibt es bereits einen Context, in dem eine Axios-Instanz konfiguriert ist. Um den Context zur Verfügung zu stellen (*provide*), muss die Komponente, in der ein HTTP-Request gemacht werden soll, in den Wrapper aus `client\src\utils\context-hooks\use-api.js` verpackt werden. Anhand des vorherigen Beispiels:

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

Innerhalb des Wrappers bzw. in `<ChildComponent/>` kann der Context nun mit dem `useApi`-Hook verwendet werden (*consume*):

```react
import React, { useState, useEffect } from 'react';
import { useApi } from '../utils/context-hooks/use-api';
function ChildComponent() {
  const api = useApi();
  const [content, setContent] = useState();

  useEffect(() => {
  api.get('./beispiel/')
    .then(function (response) {
      setContent(response.data) // genaue Verwendung abhängig von Datenstruktur der HTTP-Response
    })
    .catch(function (error) {
      // Handle Error
    });
  }, [])
    
  return (
    <div>
      {content.map((beispiel, i) => {
        // Stelle hier die Inhalte dar
      })};
    </div>
  );
}
export default ParentComponent;
```

#### Styling

//TODO: Styling muss modularisiert werden! Aktuell kontaminieren sich die verschiedenen Stylesheets gegenseitig
