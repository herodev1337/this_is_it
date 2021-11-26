<h1 align="center">This is IT</h1>

//TODO: Description...

---



## Getting Started

#### Prerequisites

- [node.js](https://nodejs.org/en/)
  - npm



#### Clone

`git clone https://github.com/herodev1337/this_is_it.git`

oder

`git clone git@github.com:herodev1337/this_is_it.git`



#### Server starten

1. `cd this_is_it/server`
2. `npm install` **oder** `npm i` (nur nach dem ersten pull/clone)
3. `npm start` **oder** `node server.js`
4. Server sollte gestartet sein!



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
│  ├─ public/	     <-- Diese Dateien werden von React generiert, hier sollte nichts verändert werden
│  ├─ src/           
│  │  ├─ components/ <-- Sekundäre React-Komponenten
│  │  ├─ routes/     <-- Primäre React-Komponenten, die in index.js verwendet werden
│  │  ├─ static/     <-- Statische Assets, wie z.B. Bilder
│  │  ├─ styles/     <-- (S)CSS Dateien
│  │  ├─ utils/      <-- JS-Dateien wie Contexts, Hooks, Konfigurationsdateien, etc.
│
├─ server/           // EXPRESS SERVER
│  ├─ config/        <-- Konfigurationsdateien z.B. Database Credentials und URL, Settings...
│  ├─ controllers/   <-- API Controller für Datenbank und Authentifizierung
│  ├─ middleware/    <-- Liegt zwischen Route und Controller und kann z.B. authentifizieren
│  ├─ models/        <-- MongoDB Models
│  ├─ routes/        <-- Routing-Dateien
│  ├─ util/          <-- Hilfe-Dateien, wie z.B. Logger
````

#### Der MERN Techstack

<figure>
  <img src="https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png" alt="mern-stack" style="width:100%">
  <figcaption>Quelle: mongodb.com/mern-stack</figcaption>
</figure>
Zum [nachlesen](https://www.mongodb.com/languages/mern-stack-tutorial)

#### React Routing

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

#### API

Die Server-APIs für Datenbankabfragen, Authentifizierung usw. werden mit [Express.js](https://expressjs.com/) spezifiziert. Serverseitig würde eine API-Route beispielsweise folgendermaßen aussehen:

`server\server.js`:

```js
const express = require('express');
const app = express();
...
app.use('/api/beispiel/', require('./routes/beispielApi.route'))
```
`server\routes\beispielApi.route.js`:

```js
const router = require('express').Router();
const beispielController = require('../controllers/beispielApi.controller');

router
	.route('/')
    .get(beispielController.getBeispielÜbersicht)
    ...
router
	.route('/:beispielId')
	.get(beispielController.getBeispiel)
	.post(/*Optional Middleware*/ beispielController.createBeispiel)
	...
...
module.exports = router;
```
`server\controllers\beispielApi.controller.js`:
```js
const Beispiel = require("../models/Beispiel");

//* GET - /api/beispiel/
const getBeispielÜbersicht = (req, res, next) => {
    Quiz.find({/* OPTIONS */}).then(data => { 
        // Handle Data
    }).catch(error => {
        // Handle Error
    })
}
...
module.exports = {
    getBeispielÜbersicht,
    ...
};
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
