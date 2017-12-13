var User = require('../models/user');

module.exports=function(router){
  router.post('/users', function(req, res) {
  var user = new User();
  user.firstname = req.body.firstname;
  user.surname = req.body.surname;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
if (user.firstname == null || user.firstname == '' || user.surname == null || user.surname == '' || user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '') {
  res.send('Ensure all fields were probided ')

} else {
  user.save(function(err){
  if (err) {
    res.send('Username/Email already exists');
  } else {res.send('user created!');
}
  });
}
});

return router;
}
