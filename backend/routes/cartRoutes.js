const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController.js');

// Add a product to the user's cart (authenticated users only)
router.post('/cart/:userId', verifyToken, cartController.addToCart);

// Get the user's cart (authenticated users only)
router.get('/cart/:userId', verifyToken, cartController.getCart);

// Update the quantity of a tool in the user's cart (authenticated users only)
router.put('/cart/:userId/:toolId', verifyToken, cartController.updateQuantity);

// Delete a tool from the user's cart (authenticated users only)
router.delete('/cart/:userId/:toolId', verifyToken, cartController.deleteProduct);

module.exports = router;
