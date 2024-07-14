const Participant = require('../models/participantModel');
const mongoose = require('mongoose');

// get all participants
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find({});
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get a single participant
const getParticipant = async (req, res) => {
  const { username } = req.params;

  if (!mongoose.Types.ObjectId.isValid(username)) {
    return res.status(404).json({ error: 'No such participant' });
  }

  try {
    const participant = await Participant.findById(username);
    if (!participant) {
      return res.status(404).json({ error: 'No such participant' });
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// create a new participant
const createParticipant = async (req, res) => {
  const { username, cnic, FoodDeal } = req.body;

  try {
    const participant = await Participant.create({ username, cnic, FoodDeal });
    console.log(participant);
    res.status(200).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a participant
const deleteParticipant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(username)) {
    return res.status(400).json({ error: 'No such participant' });
  }

  try {
    const participant = await Participant.findOneAndDelete({ username });
    if (!participant) {
      return res.status(400).json({ error: 'No such participant' });
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// update a participant
const updateParticipant = async (req, res) => {
  const { username } = req.params;

  if (!mongoose.Types.ObjectId.isValid(username)) {
    return res.status(400).json({ error: 'No such participant' });
  }

  try {
    const participant = await Participant.findOneAndUpdate({ username }, { ...req.body }, { new: true });
    if (!participant) {
      return res.status(400).json({ error: 'No such participant' });
    }
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getParticipants,
  getParticipant,
  createParticipant,
  deleteParticipant,
  updateParticipant
};
