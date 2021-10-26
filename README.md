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

Coming...



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

