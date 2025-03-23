const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Protect routes - middleware to verify JWT token
exports.protect = async (req, res, next) => {
  let token;
  //console.log("Headers", req.headers);

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Not authorized",
    });
  }

  try {
    // Verify token
    console.log("JWT_SECRET", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
};
