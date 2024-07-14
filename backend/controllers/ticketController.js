const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');

// get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get a single ticket
// get all tickets of a specific username
const getTicketsByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const tickets = await Ticket.find({ userName: username });
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No tickets found for this username' });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get a single ticket by username and event name
const getTicketByUsernameAndEventName = async (req, res) => {
  const { username, eventName } = req.params;

  try {
    const ticket = await Ticket.findOne({ userName: username, eventName: eventName });
    if (!ticket) {
      return res.status(404).json({ error: 'No such ticket' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// create a new ticket
const createTicket = async (req, res) => {
  const { userName, eventName } = req.body;
  console.log(userName,eventName);
  try {
    const ticket = await Ticket.create({ userName, eventName });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(username)) {
    return res.status(400).json({ error: 'No such ticket' });
  }

  try {
    const ticket = await Ticket.findOneAndDelete({ username });
    if (!ticket) {
      return res.status(400).json({ error: 'No such ticket' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update a ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such ticket' });
  }

  try {
    const ticket = await Ticket.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!ticket) {
      return res.status(400).json({ error: 'No such ticket' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTickets,
  getTicketsByUsername,
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketByUsernameAndEventName
};
