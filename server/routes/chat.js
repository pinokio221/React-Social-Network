const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const chatController = require('../controllers/chat.controller');


router.post('/sent', tokenValidation, chatController.sentMessage);

module.exports = router;


