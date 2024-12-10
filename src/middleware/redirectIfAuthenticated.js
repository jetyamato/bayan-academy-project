require("dotenv").config();
const jwt = require("jsonwebtoken");

function redirectIfAuthenticated(req, res, next) {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) {
    return next(); // No token, allow access to the login page
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.clearCookie("token"); // Clear the token cookie
      return next(); // Invalid token, allow access to the login page
    }

    // Token is valid, redirect to the dashboard
    res.redirect("/");
  });
}

module.exports = redirectIfAuthenticated;
