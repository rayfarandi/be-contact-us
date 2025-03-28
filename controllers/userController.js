const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({ // tampilkan response dengan status 201 (Created)
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) { //jika error tidak bisa dihandle
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);
    // Check for user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User Not Found'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) { //jika password tidak cocok
      return res.status(401).json({
        success: false,
        message: 'Invalid Password Credentials'
      });
    }   
    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({ //tampilkan response
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


exports.getUser = async (req, res) => { //untuk mengambil data user
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};