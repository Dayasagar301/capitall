const express = require('express');
const { createItem, getAllItems, getUserItems, deleteItem, updateItem, purchaseItem, getItemById } = require('../controllers/itemController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const config = require('../config/config');

const router = express.Router();

// Configure Multer storage
const uploadDir = path.join(__dirname, '../uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  
  filename: (req, file, cb) => {
    console.log('1')
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });

// Define routes
router.post('/', auth, upload.single('image'), createItem);
router.get('/', getAllItems);
router.get('/myitems', auth, getUserItems);
router.delete('/:id', auth, deleteItem);
router.patch('/:id', auth, upload.single('image'), updateItem);
router.post('/purchase/:id', auth, purchaseItem);
router.get('/:id', auth, getItemById);

module.exports = router;
