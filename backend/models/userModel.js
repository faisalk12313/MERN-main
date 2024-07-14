const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userRole: {
    type: Number,
    min: 1, // Specifies minimum value of 1
    max: 3,   // Specifies maximum value of 3
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
