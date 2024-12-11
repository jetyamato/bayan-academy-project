require("dotenv").config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  } else {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  }

}

module.exports = authenticateToken;
