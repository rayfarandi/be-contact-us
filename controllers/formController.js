const { Form, User } = require('../models');

// @desc    Submit a new contact form
// @route   POST /api/forms
// @access  Public
exports.submitForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create form submission
    const form = await Form.create({
      name,
      email,
      subject,
      message,
      userId: req.user ? req.user.id : null // Optional: associate with user if logged in
    });

    res.status(201).json({
      success: true,
      data: form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all forms
// @route   GET /api/forms
// @access  Private (Admin)
exports.getForms = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Filter options
    const status = req.query.status;
    const whereClause = status ? { status } : {};

    // Get forms with pagination
    const forms = await Form.findAndCountAll({
      where: whereClause,
      limit,
      offset: startIndex,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    // Pagination result
    const pagination = {
      total: forms.count,
      pages: Math.ceil(forms.count / limit),
      currentPage: page,
      limit
    };

    res.status(200).json({
      success: true,
      pagination,
      data: forms.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single form
// @route   GET /api/forms/:id
// @access  Private (Admin)
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update form
// @route   PATCH /api/forms/:id
// @access  Private (Admin)
exports.updateForm = async (req, res) => {
  try {
    let form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    // Fields that can be updated
    const { status } = req.body;

    // Update form
    form = await form.update({ status });

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private (Admin)
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }

    await form.destroy();

    res.status(200).json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};