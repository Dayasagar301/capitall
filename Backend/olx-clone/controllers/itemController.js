const Item = require("../models/Item");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const config = require("../config/config");

exports.createItem = async (req, res) => {
  const { name, price, status, description } = req.body;
  const user = req.user.id;
  const image = req.file ? req.file.filename : null; // Store filename instead of path

  try {
    const newItem = new Item({ name, price, status, description, user, image });
    await newItem.save();

    await User.findByIdAndUpdate(user, { $push: { items: newItem._id } });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all unsold items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "unsold" });
    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get items for a specific user
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all purchases of a user
exports.getUserPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("purchases");
    res.status(200).json(user.purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, status, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    item.name = name || item.name;
    item.price = price || item.price;
    item.status = status || item.status;
    item.description = description || item.description;
    item.image = image || item.image;

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    if (item.user.toString() !== userId) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this item" });
    }

    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ msg: "Item deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
