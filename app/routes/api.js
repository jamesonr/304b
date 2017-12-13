var User = require('../models/user');

module.exports=function(router){
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
      res.json({success:false, message:'Ensure all fields were provided'});
    } else {
      user.save(function(err) {
        if (err) {
          res.json({ success:false, message:'Username or Email already exists' });
        } else {
          res.json({ success:true, message:'User Created' });
        }
      });
    }
  });

  //User Login Route
  router.post('/authenticate', function (req, res) {

    var promptedPassword = req.body.password;
    var promptedUsername = req.body.username;


        User.findOne({ username: promptedUsername }).select('email username password').exec(function (err, user) {
            if (!user) {
                res.json({
                    success: false,
                    message: 'Wrong username or password. Please try again.'
                });
            } else if (user) {
                var validPassword = user.passwordValidation(promptedPassword);
                if (validPassword) {
                  res.json({
                      success: true,
                      message: 'Authenticated!'
                  });
                } else {
                  res.json({
                      success: false,
                      message: 'Wrong password. Please try again. ' + promptedPassword + '- password ' + promptedUsername + '- username' + '. Return from userSchema: ' + user.passwordValidation(promptedPassword)
                  });
                }

            }
        })
    })

return router;

};
