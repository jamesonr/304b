var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 8080

app.use(morgan('dev'));

app.get('/home', function(req, res) {
  res.send('hello test');
}); 

app.listen(port, function() {
    console.log('Running the server on port' + port);
});
