var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//Validation on Back-end
var UserSchema = new Schema({
  firstname: { type: String, lowercase: true, required: true},
  surname: { type: String, lowercase: true, required: true},
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true, lowercase: true},
  email: { type: String, required: true, unique: true }
  });
//encryption
  UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })

  });


module.exports = mongoose.model('User', UserSchema);
