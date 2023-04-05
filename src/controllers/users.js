const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json(users);
    }
  });
};

// exports.getUserById = (req, res) => {
//   const { id } = req.params;
//   User.getById(id, (err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     } else if (!user) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.status(200).json(user);
//     }
//   });
// };

exports.createUser = (req, res) => {
  newUser = req.body
  User.insertNew(newUser, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json({ message: 'User inserted successfully' });
    }
  });
}

exports.verifyUser = (req, res) => {
  const user = req.body
  User.verify(user, (err, result) => {
    console.log(result);
    if (err == "User not found!") {
      console.error(err);
      res.status(404).json({ error: err });
    } else if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      console.log(result);
      res.status(200).json({ userId: result });
    }
  });
};

exports.getUserOrders = (req, res) => {
  const { id } = req.params
  User.getOrdersById(id, (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json({ result: result });
    }
  });
};
