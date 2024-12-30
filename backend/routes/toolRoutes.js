const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/authMiddleware');
const toolController = require('../controllers/toolController');

// Only allow admin to add and delete tools
router.delete('/tools/:id', verifyAdmin, toolController.deleteTool);
router.post('/tools', verifyAdmin, toolController.addTool);

// Anyone can get the list of tools
router.get('/tools', toolController.getTools);

module.exports = router;
