var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'jadore';
module.exports = function(router) {
  //User Registration Route
  router.post('/users', function(req, res) {
    var user = new User();
    user.title = req.body.title;
    user.firstname = req.body.firstname;
    user.surname = req.body.surname;
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (user.title == null || user.title == '' || user.firstname == null || user.firstname == '' || user.surname == null || user.surname == '' || user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '') {
      res.json({
        success: false,
        message: 'Ensure all fields were provided'
      });
    } else {
      user.save(function(err) {
        if (err) {
          res.json({
            success: false,
            message: 'Username or Email already exists'
          });
        } else {
          res.json({
            success: true,
            message: 'User Created'
          });
        }
      });
    }
  });

  //User Login Route
  router.post('/authenticate', function(req, res) {

    var promptedPassword = req.body.password;
    var promptedUsername = req.body.username;


    User.findOne({
      username: promptedUsername
    }).select('email username password').exec(function(err, user) {
        if (!user) {
          res.json({
            success: false,
            message: 'Wrong username or password. Please try again.'
          });
        } else if (user) {
          var validPassword = user.passwordValidation(promptedPassword);
          if (validPassword) {
            var token = jwt.sign({
              username: user.username,
              email: user.email
            }, secret, {
              expiresIn: '24h'
            }); //after 24hours webtoken expires/no longer usable - token is stored on userside cache
            res.json({
              success: true,
              message: 'Authenticated!',
              token: token
            });
          } else {
            res.json({
              success: false,
              message: 'Wrong password. Please try again.'
            });
          }
        }
      })
    });


  //middleware
  router.use(function(req, res, next) {

    var token = req.body.token || req.body.query || req.headers['x-access-token'];

    if (token) {
      //verify token
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Token Invalid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: 'No token provided'
      });
    }

  });

  router.post('/me', function(req, res) {
    res.send(req.decoded);
  });

  return router;
};
