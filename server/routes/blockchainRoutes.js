const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.post('/blacklist', blockchainController.addToBlacklist);
router.post('/removeFromBlacklist', blockchainController.removeFromBlacklist);
router.get('/isBlacklisted/:ip', blockchainController.checkBlacklisted);

module.exports = router;
