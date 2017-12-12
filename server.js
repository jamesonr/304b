var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080
var mongoose = require('mongoose');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/304db', function(err){
  if (err) {
    console.log('Not connected to db:' + err);
  } else {
    console.log('Connected to db')
  }
});

app.get('/home', function(req, res) {
  res.send('hello test');
});

app.listen(port, function() {
    console.log('Running the server on port' + port);
});
