const jwt = require("jsonwebtoken");
const { findUserByUsername, authenticate } = require("../utilities/authentication");
const { validationResult } = require("express-validator");

const authController = {
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach((error) => {
        errorMessages[error.path] = error.msg;
      });
      return res.status(400).render("login", { errors: errorMessages });
    }

    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user || !(await authenticate(username, password))) {
      const errorMessages = { username: "Invalid credentials" };
      return res.status(401).render("login", { errors: errorMessages });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }); // Secure cookie
    return res.redirect("/"); // Redirect to the index page
  },
  logout: async (req, res) => {
    res.clearCookie("token", { httpOnly: true });
    res.json({ success: true });
  },
};

module.exports = authController;
