const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ msg: 'Token is invalid' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
