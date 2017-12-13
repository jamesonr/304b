var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/304db', function(err){
  if (err) {
    console.log('Not connected to db:' + err);
  } else {
    console.log('Connected to db')
  }
});
// http://localhost:8080/users
app.post('/users', function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save();
  res.send('user created!');
});

app.get('/home', function(req, res) {
  res.send('hello test');
});

app.listen(port, function() {
    console.log('Running the server on port' + port);
});
