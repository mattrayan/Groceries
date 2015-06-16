var express = require('express');
var path = require('path')
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var database = require('./config/database');

var app = express();

// Configure app
mongoose.connect(database.url);    // Connect to local MongoDB

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));    // Log requests to console

app.use(bodyParser.urlencoded({'extended':'true'}));    // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));    // Parse application/vnd.api+json
app.use(methodOverride());

// Express REST routes
require('./app/routes')(app);

app.listen(8080);
console.log("Listening on port 8080");