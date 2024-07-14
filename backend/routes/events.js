const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
} = require('../controllers/eventController');

// GET all events
router.get('/', getEvents);

// GET a single event
router.get('/:eventName', getEvent);

// POST a new event
router.post('/', createEvent);

// DELETE an event
router.delete('/:eventName', deleteEvent);

// UPDATE an event
router.patch('/:eventName', updateEvent);

module.exports = router;
