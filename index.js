require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const ctrl = require('./products_controller.js');
const app = express();
app.use(bodyParser.json())
const {CONNECTION_STRING, SERVER_PORT} = process.env

massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
}).catch( err => console.log(err))

app.post('/api/products', ctrl.create)
app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)




app.listen(SERVER_PORT, () => console.log(`banging on port ${SERVER_PORT}`));