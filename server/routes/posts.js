
const express = require('express');
const router = express.Router();


let usersPosts = [
        {
            id: 1,
            userId: 1,
            text: "Hello, this is my first post.",
            likesCount: 123,
            commentsCount: 56,
            repostsCount: 12,
            publishedAt: null
        },
        {
            id: 2,
            userId: 1,
            text: "This is my second post",
            likesCount: 34,
            commentsCount: 37,
            repostsCount: 6,
            publishedAt: null
        },
        {
            id: 3,
            userId: 1,
            text: "This is my third post",
            likesCount: 56,
            commentsCount: 18,
            repostsCount: 3,
            publishedAt: null
        },
        {
            id: 4,
            userId: 2,
            text: "test text",
            likesCount: 34,
            commentsCount: 37,
            repostsCount: 12,
            publishedAt: null
        },
        {
            id: 5,
            userId: 3,
            text: "test text",
            likesCount: 34,
            commentsCount: 37,
            repostsCount: 12,
            publishedAt: null
        },
        {
            id: 6,
            userId: 3,
            text: "test text",
            likesCount: 34,
            commentsCount: 37,
            repostsCount: 12,
            publishedAt: null
        },
        {
            id: 6,
            userId: 14,
            text: "I'm nobody...",
            likesCount: 34,
            commentsCount: 37,
            repostsCount: 12,
            publishedAt: null
        }

]
const getPostsByUserId = (query, posts) => {
    const result = posts.filter((post) => {
        return post.userId === Number(query)
    })
    return result;
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
    posts.posts = usersPosts.slice(startIndex, endIndex);



    if(req.query.userId) {
        const userPosts = getPostsByUserId(req.query.userId, usersPosts)
        posts.posts = userPosts.slice(startIndex, endIndex);
        let totalPosts = userPosts.length
        posts.totalUserPosts = totalPosts
    }

    let allPostsCount = usersPosts.length;
    posts.totalCount = allPostsCount;
    res.send(posts)
    

    
});


module.exports = router;

