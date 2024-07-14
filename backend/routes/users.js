const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:username', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a user
router.delete('/:username', deleteUser);

// UPDATE a user
router.patch('/:username', updateUser);

module.exports = router;
