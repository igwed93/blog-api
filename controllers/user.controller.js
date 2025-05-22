const db = require('../models');
const User = db.User;

// Create new user
// exports.createUser = async (req, res) => {
//   try {
//     const { username, email } = req.body;

//     if (!username || !email) {
//       return res.status(400).json({ message: "Username and email are required" });
//     }

//     const newUser = await User.create({ username, email });
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating user", error: err.message });
//   }
// };

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error getting user", error: err.message });
  }
}