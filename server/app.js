var express = require('express');
var bodyParser = require('body-parser');
var apiController = require('deck-service').deckExpressRouter;

var app = express(); // Construct an express app.
var path = require('path');
var port = process.env.PORT || 3000;

// Path to the client folder, which we can use as the root to the path for 
// js, css, etc.
var clientRootPath = path.resolve(__dirname + '/../client');

// css, js, other useful folders for the page. 
app.use('/src', express.static(clientRootPath + '/src'));

// Redirect url's with trailing slashes to the same URL but sans the slash. 
app.use(function(req, res, next) {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

// Puts the endpoints onto the Express app.
app.use('/deckshuffle', apiController);

// Similar to apiController - GET request to localhost:3000/app will serve the index.html 
app.get('/deckshuffle', function(req,res){
 res.sendFile(clientRootPath + '/index.html');
});

// Logs which address and port are used to access the app.
var listener = app.listen(port, function(){
    console.log('Listening on ' + JSON.stringify(listener.address()));
    console.log('Listening on port ' + listener.address().port + '...');
});