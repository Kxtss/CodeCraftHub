const User = require('../models/userModel');
const userService = require('../services/userService'); // Import the user service
const { isValidEmail, isValidPassword } = require('../utils/validation'); // Import validation utilities
const jwt = require('jsonwebtoken'); // Still needed for generating token in login, but can be moved to service

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (!isValidPassword(password)) {
        return res.status(400).json({ message: "Password does not meet strength requirements" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await userService.createUser(username, email, password); // Use service to create user
        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.validateUserCredentials(email, password); // Use service to validate credentials
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = userService.generateAuthToken(user._id); // Use service to generate token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Example of a protected route to get user profile
const getUserProfile = async (req, res) => {
    try {
        // req.user comes from the auth middleware
        const user = await User.findById(req.user).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};


module.exports = { registerUser, loginUser, getUserProfile };