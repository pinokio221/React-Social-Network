import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:9000/api/',
    withCredentials: true
}), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export const authAPI = {
    authMe() {
        let requestURL = `http://localhost:9000/api/user/me`
        return instance.get(requestURL,{ withCredentials: true })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
        })
    },
    getQRCode() {
        let requestURL = `http://localhost:9000/api/user/qrcode`
        return instance.get(requestURL,{ withCredentials: true })
        .then(response => {
            return response;
        }).catch((error) => {
            return error.response
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
        }).catch((error) => {
            return error.response
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