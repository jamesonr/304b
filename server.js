var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var Routes = require ('./app/routes/api')(router);
var path = require('path');
//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/../front/public'));
app.use('/api',Routes);
// '/api' stops frontend + backend conflicts
mongoose.connect('mongodb://localhost:27017/304db', function(err){
  if (err) {
    console.log('Not connected to db:' + err);
  } else {
    console.log('Connected to db')
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../front/public/app/views/index.html'));
})
// http://localhost:8080/users


app.get('/home', function(req, res) {
  res.send('hello test');
});

app.listen(port, function() {
    console.log('Running the server on port' + port);
});
