const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validate');

// Validation rules for login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
];

// POST /api/auth/login
router.post('/login', loginValidation, handleValidation, login);

// GET /api/auth/me  (verify token is still valid)
router.get('/me', protect, getMe);

module.exports = router;
