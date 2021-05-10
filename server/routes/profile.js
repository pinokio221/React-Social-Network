const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { tokenValidation } = require('../validations/token_validation');

router.put('/profile_picture', tokenValidation, profileController.updateProfilePicture);
router.get('/profile_picture/:userId', tokenValidation, profileController.getProfilePicture);
router.put('/status', tokenValidation, profileController.updateProfileStatus);
router.get('/status/:userId', tokenValidation, profileController.getProfileStatus);

module.exports = router;


