const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const friendshipController = require('../controllers/friendship.controller');


router.post('/send/:to_id', tokenValidation, friendshipController.sendRequest);
router.delete('/cancel/:to_id', tokenValidation, friendshipController.cancelRequest);
router.put('/accept/:id', tokenValidation, friendshipController.acceptRequest);
router.put('/reject/:id', tokenValidation, friendshipController.rejectRequest);
router.delete('/remove/:id', tokenValidation, friendshipController.removeFriend);
router.get('/invitations/:list', tokenValidation, friendshipController.returnInvitations);
router.get('/friends/:userId', tokenValidation, friendshipController.returnUserFriends)



module.exports = router;

