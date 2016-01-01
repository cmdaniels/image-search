// Import dependencies
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var Flickr = require('flickrapi');
require('dotenv').load();

// Flickr API settings
var flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_API_KEY
};

// Initialize express app
var app = express();
var port = process.env.PORT || 8080;

// Local data store for recentQueries
var database = [];

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Route index
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route recentQueries
app.get('/recentQueries', function(req, res) {
  res.send(database);
});

// Route image search
app.get('/:search', function(req, res) {
  var offset = req.query.offset || 0;
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    if (error) {
      console.error(error);
      process.end(-1);
    }
    flickr.photos.search({
      text: req.params.search,
      page: offset,
      per_page: 10,
      safe_search: 2
    }, function(err, result) {
      if (error) {
        console.error(error);
        process.end(-1);
      }
      var photoObj;
      var resArray = [];
      result.photos.photo.forEach(function(photo) {
        photoObj = {
          url: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id + '/sizes/l/',
          snippet: photo.title,
          thumbnail: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id + '/sizes/t/',
          context: 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id
        };
        resArray.push(photoObj);
      });
      database.push({
        term: req.params.search,
        when: new Date()
      });
      res.send(resArray);
    });
  });
});

// Start express server
app.listen(port);
console.log('Express server started on port ' + port);
