const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { tokenValidation } = require('../validations/token_validation');

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);


module.exports = router;


