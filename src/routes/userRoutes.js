// A Router is a component responsible for directing incoming requests to the appropriate controller based on the request's URL and HTTP method.
// For example, here the User routes has three routes:
// POST /: The client should request on this URL (using fetch API in our case) to register new user. 
//          It directs the incoming requests to verifyUser controller method.
// POST /login: The client should request on this URL (using fetch API in our case) whenever a customer wants to login. 
//          It directs the incoming requests to getUserOrders controller method.
// GET /:id: The client should request on this URL (using fetch API in our case) to get order details for the logged in customer whose customer_id is present in the request params. 
//          It directs the incoming requests to getUserOrders controller method.

const express = require('express');
const router = express.Router();

// Controller methods from user Controller file (userController.js) are loaded in this file 
const { getUserOrders, createUser, verifyUser, yourControllerMethod } = require('../controllers/userController');

// Different routes on server
router.post('/login', verifyUser);
router.get('/:id', getUserOrders);
router.post('/', createUser);

// Template route
router.get('/<your-route>', yourControllerMethod);

// require('userRoute') in any other file will load `router` variable into that file.
module.exports = router;
