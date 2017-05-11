'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan')
var config = require('../config/runtime.json');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

var port = process.env.PORT || config.express.port || 8080;

var apiRouter = require('./app/routes/api.js');
app.use('/api', apiRouter);

app.use('/bower_components',  express.static(path.join(__dirname, '..', 'public/bower_components')));
app.use(express.static(path.join(__dirname, '..', 'public/app')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/app/index.html'));
});

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port);
});
