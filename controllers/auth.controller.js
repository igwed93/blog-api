const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password
        });

        return res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
        //console.log('Token:', token);

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};