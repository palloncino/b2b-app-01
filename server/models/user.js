const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,  // If you need a custom ID in addition to MongoDB's _id
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'customer' },
  profile: {
    firstName: String,
    lastName: String,
    companyName: String,
    position: String
  },
  contact: {
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  settings: {
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
