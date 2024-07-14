const express = require('express');
const {
  getTickets,
  getTicketsByUsername,
  createTicket,
  deleteTicket,
  getTicketByUsernameAndEventName,
  updateTicket // Ensure this function is imported
} = require('../controllers/ticketController');

const router = express.Router();

// GET all tickets
router.get('/', getTickets);

// GET a single ticket by username
router.get('/:username', getTicketsByUsername);

// GET a single ticket by username and event name
router.get('/:username/:eventName', getTicketByUsernameAndEventName); // Use getTicketByUsernameAndEventName here

// POST a new ticket
router.post('/', createTicket);

// DELETE a ticket
router.delete('/:username', deleteTicket);

// UPDATE a ticket
router.patch('/:username', updateTicket);

module.exports = router;
