// Import dependencies
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');

// Initialize express app
var app = express();
var port = process.env.PORT || 8080;

// Local data store for recentQueries
var database = [];

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve favicon
app.use(favicon(__dirname + '/favicon.ico'));

// Route index
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route recentQueries
app.get('/recentQueries', function(req, res) {
  res.json({});
});

// Route image search
app.get('/:search', function(req, res) {
  var offset = req.query.offset || 0;
  res.json({});
});

// Start express server
app.listen(port);
console.log('Express server started on port ' + port);
