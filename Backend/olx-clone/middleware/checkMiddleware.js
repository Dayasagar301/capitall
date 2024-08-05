const Blacklist = require('../models/Blacklist');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ msg: 'Token is invalid' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
