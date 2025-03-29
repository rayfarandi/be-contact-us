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
// router.post('/',submitForm);

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: API for managing contact forms
 */

// hanya bisa jika sudah login 
/**
 * @swagger
 * /api/forms:
 *   post:
 *     summary: Submit a new contact form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Form submitted successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect,submitForm);


// view all forms by user
/**
 * @swagger
 * /api/forms/mine:
 *   get:
 *     summary: Get all forms submitted by the logged-in user
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of forms submitted by the user
 */
router.get('/mine', protect, getMyForms);


// Protected admin routes
/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Get all forms (Admin only)
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all forms
 */
router.get('/', protect, adminOnly, getForms);

/**
 * @swagger
 * /api/forms/{id}:
 *   get:
 *     summary: Get a specific form by ID (Admin only)
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form details
 */
router.get('/:id', protect, adminOnly, getForm);

/**
 * @swagger
 * /api/forms/{id}:
 *   patch:
 *     summary: Update a form by ID (Admin only)
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, resolved]
 *     responses:
 *       200:
 *         description: Form updated successfully
 */
router.patch('/:id', protect, adminOnly, updateForm);

/**
 * @swagger
 * /api/forms/{id}:
 *   delete:
 *     summary: Delete a form by ID (Admin only)
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form deleted successfully
 */
router.delete('/:id', protect, adminOnly, deleteForm);

module.exports = router;