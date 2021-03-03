const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const friendshipController = require('../controllers/friendship.controller');


router.post('/send/:to_id', tokenValidation, friendshipController.sendRequest);
router.delete('/cancel/:to_id', tokenValidation, friendshipController.cancelRequest);
router.get('/invitations/:list', tokenValidation, friendshipController.returnInvitations);



module.exports = router;

