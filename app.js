// require the express module
const express = require('express');
const path = require("path");
const app = express();
// add the middleware to parse the body content

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.listen(3000);