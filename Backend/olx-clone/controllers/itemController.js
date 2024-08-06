const Item = require('../models/Item');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

exports.createItem = async (req, res) => {
  console.log('File received:', req.file); // Debug log

  const { name, price, status, description } = req.body;
  const userId = req.user.id;
  const image = req.file ? `uploads/${req.file.filename}` : null; // Make sure this path matches the static serving path

  try {
    const user = await User.findById(userId); // Fetch user details
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const newItem = new Item({ name, price, status, description, user: userId, image, username: user.username });
    await newItem.save();

    await User.findByIdAndUpdate(userId, { $push: { items: newItem._id } });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all unsold items with populated user details
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'unsold' }).populate('user', 'username');
    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get items for a specific user with populated user details
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).populate('user', 'username');
    res.status(200).json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all purchases of a user
exports.getUserPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('purchases');
    res.status(200).json(user.purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, status, description } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null; // Prepend 'uploads/' to the filename

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
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
    res.status(500).send('Server error');
  }
};

// Delete an item

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.user.toString() !== userId) {
      return res.status(401).json({ msg: 'Not authorized to delete this item' });
    }

    // Optionally, delete the associated image from the server
    if (item.image) {
      const imagePath = path.join(config.multerDest, item.image);
      console.log(`Attempting to delete image at path: ${imagePath}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`Image file not found: ${imagePath}`);
      }
    }

    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ msg: 'Item deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Purchase an item
exports.purchaseItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const item = await Item.findById(id).populate('user', 'username');
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.status === 'sold') {
      return res.status(400).json({ msg: 'Item already sold' });
    }

    item.status = 'sold';
    item.purchasedBy = userId;
    await item.save();

    // Add the item to the user's purchased items
    await User.findByIdAndUpdate(userId, { $push: { purchases: item._id } });

    res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};