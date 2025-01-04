const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');




router.post('/support', supportController.addSupport);
router.get('/support/messages', supportController.getAllSupportMessages);
router.get('/support/messages/:id', supportController.getSupportMessageDetails);
router.delete('/support/messages/:id', supportController.deleteSupportMessage)

module.exports = router;