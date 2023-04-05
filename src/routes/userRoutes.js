const express = require('express');
const router = express.Router();

const { getAllUsers, getUserOrders, createUser, verifyUser } = require('../controllers/users');

// router.get('/', getAllUsers);
router.post('/login', verifyUser);
router.get('/:id', getUserOrders);
router.post('/', createUser);

module.exports = router;
