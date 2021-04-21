const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const twoFactorAuthController = require('../controllers/2fa_controller')

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/verify', twoFactorAuthController.twoFactorVerify);
router.post('/validate', twoFactorAuthController.twoFactorValidate);
router.get('/logout', authController.signOut);
router.get('/me', authController.checkCurrentUser);
router.get('/qrcode', twoFactorAuthController.getQRCode);


module.exports = router;


