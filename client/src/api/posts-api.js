import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
})

export const postsAPI = {
    getProfilePosts(userId) {
        let requestURL = `http://localhost:9000/api/posts?userId=${userId}&limit=5`
        return instance.get(requestURL, { withCredentials: true })
            .then(response => {
                return response.data;
            })
    },

    addNewPost(post_content){
        let requestURL = `http://localhost:9000/api/posts/add`
        return instance.post(requestURL, 
            {
               content: post_content
            },
            { withCredentials: true })
            .then(response => {
                return response.data.post;
            })
    },

    deletePost(post_id) {
        let requestURL = `http://localhost:9000/api/posts/delete?id=${post_id}`
        return instance.delete(requestURL, {withCredentials: true })
            .then(response => {
                return response;
            })
    }
}