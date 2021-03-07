const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../validations/token_validation');
const postsController = require('../controllers/posts.controller');

router.get('/', tokenValidation, postsController.returnPosts);
router.post('/add', tokenValidation, postsController.addNewPost);
router.delete('/delete', tokenValidation, postsController.deletePost);


module.exports = router;

