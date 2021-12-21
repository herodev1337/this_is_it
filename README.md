<h1 align="center">This is IT</h1>

Description...

---

#### Clone

`git clone https://github.com/herodev1337/this_is_it.git`

or

`git clone git@github.com:herodev1337/this_is_it.git`

### Folder structure

````
this_is_it/        
├─ client/           <-- React client
│  ├─ ...            <-- <b>Frontend team add information...</b>
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
To understand how to configure the server look into [Configuration](server/README.md#Configuration)
<b>For testing just contact me and i will send you an already crafted configuration file.</b>


