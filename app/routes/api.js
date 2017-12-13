var User = require('../models/user');

module.exports=function(router){
  router.post('/users', function(req, res) {
  var user = new User();
  user.title = req.body.title;
  user.firstname = req.body.firstname;
  user.surname = req.body.surname;
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
if (user.title == null || user.title == '' || user.firstname == null || user.firstname == '' || user.surname == null || user.surname == '' || user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '') {
  res.json({success:false, message:'Ensure all fields were provided'});
} else {
  user.save(function(err){
  if (err) {
    res.json({success:false, message:'Ensure all fields were provided'});
  } else {
    res.json({success:true, message:'User Created'});
}
  });
}
});

return router;
}
