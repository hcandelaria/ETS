const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var availabilitySchema = new Schema({
  // id: String,
  day: String,
  available: { type: Boolean, default: true},
  from: String,
  to: String,
  step: { type: Number, default: 900},
  // startDate: {}
});

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {  type: String, index: { unique: true } },
  password: String,
  store: String,
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  timesAvailable: [],
  // timesAvailable: { type: [availabilitySchema] },
});



UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
