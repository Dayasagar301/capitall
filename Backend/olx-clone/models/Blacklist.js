const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Token expires after 1 day
});

module.exports = mongoose.model('Blacklist', BlacklistSchema);
