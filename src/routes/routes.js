const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authenticateToken = require("../middleware/authenticateToken");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../public/img");
    cb(null, uploadDir); // Destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// router.get("/", (req, res) => {
//   const activeLink = "dashboard";
//   res.render("index", { activeLink });
// });
router.get("/", authenticateToken, itemController.getAllItems);
router.get("/items", authenticateToken, itemController.getAllItems);
router.get("/items/add", authenticateToken, (req, res) => {
  res.render("items/new");
});
router.post("/items", authenticateToken, upload.single("itemImage"), itemController.createItem);
router.get("/items/:id", authenticateToken, itemController.getItem);
router.put("/items/:id", authenticateToken, upload.single("itemImage"), itemController.updateItem);
router.delete("/items/:id", authenticateToken, itemController.deleteItem);
router.patch("/items/:id/soft-delete", authenticateToken, itemController.softDeleteItem);
router.post("/items/search", authenticateToken, itemController.searchItems);

module.exports = router;
