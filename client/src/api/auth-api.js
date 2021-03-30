import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
})

export const authAPI = {
    authMe() {
        let requestURL = `http://localhost:9000/api/user/me`
        return instance.get(requestURL,{ withCredentials: true })
        .then(response => {
            if(response.status === 200){
                return response.data;
            }
        })
    },
    userRegister(data) {
        let requestURL = `http://localhost:9000/api/user/register`
        return instance.post(requestURL, {
            firstname: data.firstname,
            lastname: data.lastname,
            fullname: data.fullname,
            email: data.email,
            login: data.login,
            gender: data.gender,
            birthday: data.birthday,
            age: data.age,
            password: data.password
        },).then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    userLogin(data) {
        let requestURL = `http://localhost:9000/api/user/login`
        return instance.post(requestURL,{
            login: data.login,
            password: data.password
        },{ withCredentials: true }).then(response => {
            return response;
        })
    },
    userLogout() {
        let requestURL = `http://localhost:9000/api/user/logout`
        return instance.get(requestURL, { withCredentials: true }).then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    }
}