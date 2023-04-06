const express = require('express');
const router = express.Router();

// Controller methods from user Controller file (users.js) are loaded in this file 
const { getUserOrders, createUser, verifyUser } = require('../controllers/users');

// Different routes on server
router.post('/login', verifyUser);
router.get('/:id', getUserOrders);
router.post('/', createUser);

// require('userRoute') in any other file will load `router` variable into that file.
module.exports = router;
