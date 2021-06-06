const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    default: "bag.png"
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", cateSchema);