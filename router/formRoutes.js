const express = require('express');
const router = express.Router();
const { 
  submitForm, 
  getForms, 
  getForm, 
  updateForm, 
  deleteForm 
} = require('../controllers/formController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public route
router.post('/', submitForm);

// Protected admin routes
router.get('/', protect, adminOnly, getForms);
router.get('/:id', protect, adminOnly, getForm);
router.patch('/:id', protect, adminOnly, updateForm);
router.delete('/:id', protect, adminOnly, deleteForm);

module.exports = router;