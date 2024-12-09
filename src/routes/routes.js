const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const itemController = require("../controllers/itemController");

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
router.get("/", itemController.getAllItems);
router.get("/items", itemController.getAllItems);
router.get("/items/add", (req, res) => {
  res.render("items/new");
});
router.post("/items", upload.single("itemImage"), itemController.createItem);
router.get("/items/:id", itemController.getItem);
router.put("/items/:id", upload.single("itemImage"), itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);
router.patch("/items/:id/soft-delete", itemController.softDeleteItem);
router.post("/items/search", itemController.searchItems);

module.exports = router;
