const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.signOut);
router.get('/me', authController.checkCurrentUser);


module.exports = router;


