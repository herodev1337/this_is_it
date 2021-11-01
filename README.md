<h1 align="center">This is IT</h1>

Description...

---



## Server

#### Prerequisites

- [node.js](https://nodejs.org/en/)
  - npm



#### Clone

`git clone https://github.com/herodev1337/this_is_it.git`

oder

`git clone git@github.com:herodev1337/this_is_it.git`



#### Server starten

1. `cd this_is_it`
2. `npm install` **oder** `npm i`
3. `npm start` **oder** `node app.js`
4. Server sollte gestartet sein!



## Development

### Ordnerstruktur

````
this_is_it/          <-- Hauptordner
├─ client/           
│  ├─ src/           <-- Dateien für den Client die später mit webpack gebundelt werden
├─ db/               <-- MongoDB Dateien
├─ server/           
│  ├─ config/        <-- Konfigurationsdateien z.B. Database Credentials, Settings...
│  ├─ controllers/   <-- Liegt zwischen Routing und View; Hier kommen benötigte Funktionen rein
│  ├─ middleware/    <-- Liegt zwischen Route und Controller und kann z.B. authentifizieren
│  ├─ models/        <-- Hier kommen die Models rein
│  ├─ public/        <-- Statische Dateien die sich unter <URL>/<DATEI> befinden
│  ├─ routes/        <-- Routing-Dateien; Damit der Server weiß, was wo ist
│  ├─ util/          <-- Hilfe-Dateien; Funktionen die mehrmals verwendet werden (z.B. Logger)
│  ├─ views/         <-- View-Dateien; Werden vom Server in HTML gerendert
````





## Beispiele

### Express

---

#### Variablen etc. zu Views übergeben

```js
router.get('/whoami', (req, res) => {
    let request = Object.entries(req.rawHeaders);

    res.render('../views/whoami', {
        //Hier die Variablen angeben
        who: request
    });
});
```



```html
<h1>Request Headers:</h1>

<ul>
    <!-- Da who in dem Fall ein Array ist, nutzen wir forEach -->
    <% who.forEach(function(entry){ %>
    	<li><%=entry%></li>
    <% }); %>
</ul>
```

