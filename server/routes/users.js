const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const usersController = require('../controllers/users.controller');


router.get('/', tokenValidation, usersController.returnUsers);   
router.get('/filter', tokenValidation, usersController.returnUsersByFilter)


module.exports = router;

