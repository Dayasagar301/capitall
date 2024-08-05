const express = require('express');
const { createItem, getAllItems, getUserItems, deleteItem,updateItem } = require('../controllers/itemController');
const auth = require('../middleware/auth');
const multer = require('multer');
const config = require('../config/config');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.multerDest);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.single('image'), createItem);
router.get('/', getAllItems);
router.get('/myitems', auth, getUserItems);
router.delete('/:id', auth, deleteItem);
router.patch('/:id', auth, upload.single('image'), updateItem);
module.exports = router;
