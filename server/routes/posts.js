const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


const getAllPosts = () => {
    return Post.query();
}
const getPostsByUserId = (query) => {
    return Post.query().where('user_id', query)
}

router.get('/', (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (req.query.limit > 50) { res.send("The number of posts cannot exceed 50.") }
    if (!req.query.limit) { limit = 5; }
    if(!req.query.page) { page = 1; }

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const posts = {};

    if(req.query.userId) {
        getPostsByUserId(req.query.userId).then(function(user_posts){
            posts.posts = user_posts.slice(startIndex, endIndex);
            let totalPosts = user_posts.length;
            posts.totalUserPosts = totalPosts;
            res.send(posts);
        })
    }
    else {
        getAllPosts().then(function(result){
            posts.posts = result.slice(startIndex, endIndex);
            let allPostsCount = result.length;
            posts.totalCount = allPostsCount;
            res.send(posts);
        })
    }

});


module.exports = router;

