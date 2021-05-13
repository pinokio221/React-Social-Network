import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = axios.create({
    baseURL: 'http://localhost:9000/api/user',
    withCredentials: true
})

export const authAPI = {
    authMe() {
        return instance.get('/me')
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    userRegister(data) {
        return instance.post('/register', {
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
        return instance.post('/login',{
            login: data.login,
            password: data.password
        }).then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    userLogout() {
        return instance.get('/logout').then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    twoFactorVerify(authId, authCode) {
        return instance.put(`user/verify`,{
            authId,
            authCode
        }).then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    twoFactorValidate(authId, authCode) {
        return instance.post(`user/validate`,{
            authId,
            authCode
        }).then(response => {
            return response
        }).catch((error) => {
            return error.response
        })
    }
}