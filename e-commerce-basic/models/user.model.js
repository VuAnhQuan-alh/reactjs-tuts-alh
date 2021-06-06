const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim : true,
    maxLength: 32,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    default: "avatar.png"
  },
  about: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  },
  cart: {
    type: Array,
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);