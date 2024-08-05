require('dotenv').config(); // Load environment variables

module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string
  jwtSecret: process.env.JWT_SECRET, // JWT secret key
  multerDest: process.env.MULTER_DEST || 'uploads/', // Directory for storing uploaded images
};
