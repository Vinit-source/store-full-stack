// A Controller is a component responsible for handling incoming requests from clients and generating appropriate responses. 
// It acts as a middle layer between the client and the backend application's logic (model) and database.
// For example, here the User controller has three controller methods:
// createUser(req, res): Accepts req from the POST / route and returns back response after processing.
//                       It calls insertNew method to add the details of the new customer into the customers table.
//                       It generates response status based on the output of the insertNew method.
// verifyUser(req, res): Accepts req from the POST /login route and returns back response after processing.
//                       It calls verify method to verify the login details of the user.
//                       It generates response status based on the output of the verify method.
// getUserOrders(req, res): Accepts req from the GET /:id route and returns back response after processing.
//                       It calls getOrdersById method to get the order details of the logged in customer.
//                       It generates response status based on the output of the getOrdersById method.


const User = require('../models/userModel');

// Controller function for user registration
exports.createUser = (req, res) => {
  newUser = req.body  // contains all the registration form data in JSON format
  User.insertNew(newUser, (err, result) => {
    if (err)
    // Raise server error for any other database error
    {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else
    // Register successful. Message is sent in the response 
    {
      res.status(200).json({ message: 'User inserted successfully' });
    }
  });
}

// Controller function for user login
exports.verifyUser = (req, res) => {
  const user = req.body // contains phone and password passed by user
  User.verify(user, (err, result) => {
    // console.log(result);
    if (err == "User not found!")
    // When the phone number entered by user is not registered
    {
      console.error(err);
      res.status(404).json({ error: err });
    } else if (err)
    // Raise server error for any other database error
    {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else
    // Login successful. UserId is sent in the response 
    {
      // console.log(result);
      res.status(200).json({ userId: result });
    }
  });
};

// Controller function for getting orders of the user
exports.getUserOrders = (req, res) => {
  const { id } = req.params
  User.getOrdersById(id, (err, result) => {
    // console.log(result);
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json({ result: result });
    }
  });
};

// Three functions are separately exported from this file.

/* <Template Controller function> */
exports.yourControllerMethod = (req, res) => {
  const { params_used_in_query } = req.params
  User.yourMethod(params_used_in_query, (err, result) => {
    // console.log(result);
    if (err)
    // 500 - Server error. Raise server error for any other database error
    {
      console.error(err); // This error would be seen on the server side
      res.status(500).json({ error: 'Server error' });
    } else
    // 200 - OK. The response is generated as expected
    {
      res.status(200).json({ result: result }); // Send result for Select queries
      // res.status(200).json({ message: 'Query successfully executed' }); // Send success message for other queries
    }
  });
};