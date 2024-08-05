// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['sold', 'unsold'], default: 'unsold' },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String }, 
  purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // New field
});

module.exports = mongoose.model('Item', ItemSchema);
