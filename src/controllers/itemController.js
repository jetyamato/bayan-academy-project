const Item = require("../models/Item");
const fs = require("fs");
const path = require("path");

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    const activeLink = "items";
    res.render("items/all", { items, activeLink });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a single item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    let newItem = {
      name: req.body.itemName,
      description: req.body.itemDescription ?? "",
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
    };

    if (req.file) {
      console.log(req.file);

      newItem.image = "/img/" + req.file.filename;
    }

    await Item.create(newItem);

    res.status(201).json({
      // status: "success",
      success: true,
      //   data: {
      //     item: newItem,
      //   },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Soft delete an item by ID
exports.softDeleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
