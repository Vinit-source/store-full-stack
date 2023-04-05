const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, verifyUser } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login', verifyUser);

module.exports = router;
