const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", (req, res) => {
  const activeLink = "dashboard";
  res.render("index", { activeLink });
});
router.get("/items", itemController.getAllItems);
router.get("/items/add", (req, res) => {
  res.render("items/new");
});
router.post("/items", itemController.createItem);
router.get("/items/:id", itemController.getItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);
router.patch("/items/:id/soft-delete", itemController.softDeleteItem);

module.exports = router;
