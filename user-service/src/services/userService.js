const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user (used by registerUser controller)
const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
};

// Find a user by email and validate password (used by loginUser controller)
const validateUserCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return null; // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null; // Password does not match
    }
    return user;
};

// Generate a JWT token for a user
const generateAuthToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// You can add more business logic functions here, e.g., getUserProfile, updateUserProfile, etc.

module.exports = {
    createUser,
    validateUserCredentials,
    generateAuthToken,
};