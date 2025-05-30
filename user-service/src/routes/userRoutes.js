const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware'); // Import the auth middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile); // Protected route: requires a valid JWT token

module.exports = router;