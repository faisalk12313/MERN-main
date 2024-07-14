const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import the userSchema from userModel.js
const User = require('./userModel');

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  // Reference to the User schema
  facultyMentorUsername: {
    type: String,
    ref: 'User', // Referencing the 'User' model
    required: true
  }
}, { timestamps: true });

// Middleware to remove associated events when a user is removed
eventSchema.pre('remove', async function(next) {
  try {
    // Use the User model to delete events associated with the user
    await Event.deleteMany({ facultyMentorUsername: this.username });
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model('Event', eventSchema);
