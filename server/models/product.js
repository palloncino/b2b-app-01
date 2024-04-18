const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  category: String,
  imgUrl: String,
  id: { type: String, unique: true, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateLastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
