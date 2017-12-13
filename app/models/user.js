var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Validation on Back-end
var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true, lowercase: true, unique: true }

  });

module.exports = mongoose.model('User', UserSchema);
