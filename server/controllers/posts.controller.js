const Post = require('../models/Post');
const verifyUser = require('../verifyUser');


const getAllPosts = () => {
    return Post.query();
}
const getPostsByUserId = (query) => {
    return Post.query().where('user_id', query)
}

const addNewPost = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Post.query().insert({
                user_id: user.userId,
                content: req.body.content,
            })
            .then(function(result){
                Post.query().select()
                .where('id', result.id).first().then(function(value){
                    res.status(201).json({
                        post: value,
                        message: "You succesfully added a new post",
                    })
                })
                
            }
        )}
    } catch(err) {
        res.status(400).send(err);
    }
}

const updatePost = (req, res, next) => {
    let user = verifyUser.getCurrentUser(req, res, next);
    if(user) {
        Post.query().update({
            content: req.body.content
        }).where('id', req.body.id).returning('id', 'content').first()
        .then(function(result) {
            if(result) {
                return res.status(200).json({
                    message: "Post succesfully updated",
                    post: result
                })
            }
            return res.status(400).json({
                message: "Something went wrong"
            })
        })
    }
}

const deletePost = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Post.query()
                .where('id', req.query.id)
                .andWhere('user_id', user.userId)
            .del()
            .then(function(result){
                if(result){
                    res.status(201).json({
                        message: "You successfully removed your post.",
                    })
                }
                else{
                    return res.status(400).json({
                        message: "Post not found"
                    })
                }
                
            })
        }
    } catch(err) {
        res.status(400).send(err);
    }
}

function returnPosts(req, res){
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (req.query.limit > 50) { res.send("The number of posts cannot exceed 50.") }
    if (!req.query.limit) { limit = 5; }
    if(!req.query.page) { page = 1; }

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const posts = {};

    if(req.query.userId) {
        getPostsByUserId(req.query.userId).orderBy('id','desc').then(function(user_posts){
            posts.posts = user_posts.slice(startIndex, endIndex);
            let totalPosts = user_posts.length;
            posts.totalUserPosts = totalPosts;
            res.send(posts);
        })
    }
    else {
        getAllPosts().orderBy('id','desc').then(function(result){
            posts.posts = result.slice(startIndex, endIndex);
            let allPostsCount = result.length;
            posts.totalCount = allPostsCount;
            res.send(posts);
        })
    }
}

module.exports = { 
    returnPosts, 
    addNewPost, 
    updatePost,
    deletePost };