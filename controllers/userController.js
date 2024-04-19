const User  = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
// Controller to handle user registration
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            // User already exists, return an error
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user if the user does not exist
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    } catch (error) {
        // Handle other errors
        console.error('Error:', error);
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};

// Controller to handle user login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, 'abcdefghijklmnopqrstuvwxyzabcdef', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
};


// Controller to handle fetching all users
exports.getAllUsers = [ verifyToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
]
