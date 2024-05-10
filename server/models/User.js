const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "The user needs a first name"]
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "The user needs a email"],
  },
  password: {
    type: String,
    required: [true, "The user needs a password"],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};