import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/posts',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const postsAPI = {
    getProfilePosts(userId) {
        return instance.get(`?userId=${userId}&limit=5`)
        .then(response => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    },

    addNewPost(post_content){
        return instance.post(`/add`, 
            {
               content: post_content
            })
        .then(response => {
            return response.data.post;
        }).catch((error) => {
            return error.response
        })
    },

    deletePost(post_id) {
        return instance.delete(`/delete?id=${post_id}`)
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    }
}