var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

module.exports = app;
