const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel'); // Import the User model

const participantSchema = new Schema({
  // Reference to the User schema
  username: {
    type: String,
    required: true,
    unique: true 
  },
  cnic: {
    type: String
  },
  foodDeal: {
    type: Number
  }
});

module.exports = mongoose.model('Participant', participantSchema);
