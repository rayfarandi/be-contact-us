const express = require('express');
const router = express.Router();
const { 
  submitForm, 
  getForms, 
  getForm, 
  updateForm, 
  deleteForm,
  getMyForms
} = require('../controllers/formController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

//  jika mengunakan Public route
//router.post('/', protect,submitForm);

// hanya bisa jika sudah login 
router.post('/', protect,submitForm);

// view all forms by user
router.get('/mine', protect, getMyForms);


// Protected admin routes
router.get('/', protect, adminOnly, getForms);
router.get('/:id', protect, adminOnly, getForm);
router.patch('/:id', protect, adminOnly, updateForm);
router.delete('/:id', protect, adminOnly, deleteForm);

module.exports = router;