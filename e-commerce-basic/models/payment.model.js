const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: Object,
    default: []
  },
  cart: {
    type: Object,
    default: []
  },
  paymentID: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Payments", paymentSchema);