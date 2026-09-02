const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getStats,
} = require('../controllers/enquiryController');

const { protect } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validate');

const SERVICES = [
  'Website Development',
  'Web/Mobile App Development',
  'CRM',
  'ERP/Odoo',
  'Custom Software',
  'Business Automation',
  'AI Automation',
  'API Integration',
  'Digital Marketing',
  'Other',
];

// Validation rules for creating/updating an enquiry
const enquiryValidation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^\+?[\d\s\-()\\.]{7,20}$/).withMessage('Enter a valid phone number.'),
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required.')
    .isLength({ max: 150 }).withMessage('Company name cannot exceed 150 characters.'),
  body('service')
    .notEmpty().withMessage('Service is required.')
    .isIn(SERVICES).withMessage('Please select a valid service.'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters.')
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters.'),
];

// ── Public ────────────────────────────────────────────────────
// POST /api/enquiries — submit from contact form
router.post('/', enquiryValidation, handleValidation, createEnquiry);

// ── Protected (admin only) ────────────────────────────────────
// GET /api/enquiries/stats
router.get('/stats', protect, getStats);

// GET /api/enquiries
router.get('/', protect, getAllEnquiries);

// GET /api/enquiries/:id
router.get('/:id', protect, getEnquiry);

// PUT /api/enquiries/:id
router.put('/:id', protect, updateEnquiry);

// DELETE /api/enquiries/:id
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
