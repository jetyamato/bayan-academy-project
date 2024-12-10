const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../middleware/redirectIfAuthenticated");

const router = express.Router();

// Login route
router.get("/login", redirectIfAuthenticated, (req, res) => {
  res.render("login", { errors: {} });
});
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
