const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { body, query } = require('express-validator');

// Validation middleware
const validateAddSchool = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  (req, res, next) => {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Routes
router.post('/addSchool', validateAddSchool, schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
