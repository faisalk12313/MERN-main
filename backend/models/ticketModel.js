const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  participant: {
    type: Schema.Types.ObjectId,
    ref: 'Participant',
    required: true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
