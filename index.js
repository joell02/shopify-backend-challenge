require("dotenv").config()

const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const multer = require('multer');
const upload = multer();


const app = express();
const port = process.env.PORT || 3000

app.use(express.json()); // parse json bodies in the request object

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Error",
  });
});

const server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.use(methodOverride("_method"));

// Redirect requests to endpoint starting with /api to index.js
const routes = require('./routes/inventoryItems');
app.use(routes);