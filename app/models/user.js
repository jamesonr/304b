var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'matches',
    //No Special Characters
    arguments: /^[a-zA-Z\-]+$/i,
    message: 'Name must not have special characters'
  }),
  validate({
    validator: 'isLength',
    //Min 3 chars Max 20
    arguments: [3, 20],
    message: 'Firstname & Surname fields should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isLength',
    //Min 3 chars Max 50
    arguments: [3, 50],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isEmail',
    message: 'Is not a valid e-mail'
  })
];


var usernameValidator = [
  validate({
    validator: 'isLength',
    //Min 3 chars Max 25
    arguments: [3, 25],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator:'isAlphanumeric',
    message: 'Username must contain letters and numbers only'
  })
];

var passwordValidator = [
  validate({
    validator: 'matches',
    //using RegEx in arguments
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/g,
    message: 'Password must have at least one lowercase, one uppcase, one number, one special/character , and must be at least 8 characters but not more than 35'
  }),
  validate({
    validator: 'isLength',
    //Min 3 chars Max 50
    arguments: [8, 35],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var UserSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: true,
    validate: nameValidator
  },
  surname: {
    type: String,
    required: true,
    validate: nameValidator
  },
  username: {
    type: String,
    unique: true,
    required: true,
    validate: usernameValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: emailValidator
  },
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
//Keeps DB names consistent - plugin
UserSchema.plugin(titlize, {
  paths: ['firstname', 'surname']
});

UserSchema.methods.passwordValidation = function(password) {
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);
