const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'unsold' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);
