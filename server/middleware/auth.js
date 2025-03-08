const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Extract token from Authorization header
    // Format: "Bearer <token>"
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Return 401 if no token is provided
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
        details:
          "You need to be logged in to do this. Please log in and try again.",
        suggestions: [
          "Check if you're logged in",
          "Try logging out and back in",
          "Ensure your session hasn't expired",
        ],
      });
    }

    // Verify token and decode user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request object
    // This makes user data available to subsequent middleware and route handlers
    req.user = decoded;

    // Token is valid, proceed to next middleware
    next();
  } catch (error) {
    // Handle various JWT errors with user-friendly messages
    let errorMessage = "Authentication failed";
    let errorDetails =
      "Your login session has expired or is invalid. Please log in again.";
    let suggestions = ["Log in again", "Check your connection"];

    // Provide specific error messages based on JWT error types
    if (error.name === "TokenExpiredError") {
      errorMessage = "Session expired";
      errorDetails = "Your login session has expired";
      suggestions = ["Please log in again to continue"];
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token";
      errorDetails = "Your authentication token is invalid";
      suggestions = ["Try clearing your browser cache", "Log in again"];
    }

    res.status(401).json({
      message: errorMessage,
      details: errorDetails,
      suggestions,
      technicalDetails: error.message,
    });
  }
};

module.exports = auth;
