const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const chatController = require('../controllers/chat.controller');


router.post('/sent', tokenValidation, chatController.sentMessage);
router.get('/dialogs', tokenValidation, chatController.returnUserDialogs);
router.get('/messages', tokenValidation, chatController.returnDialogMessages);

module.exports = router;


