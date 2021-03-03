const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const friendshipController = require('../controllers/friendship.controller');


router.post('/sent/:to_id', tokenValidation, friendshipController.sentRequest);
router.delete('/cancel/:to_id', tokenValidation, friendshipController.cancelRequest);

module.exports = router;

