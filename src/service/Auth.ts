import LoginBody from "../model/login-body";
import axios from "axios";
import Url from "./Url";
import LoginResponse from "../model/login-response";

class Auth {

    login = (body: LoginBody, callback: () => void, error: () => void) => {
        console.log(Url.login)
        axios.post<LoginResponse>(Url.login, body).then((response) => {
            console.log(response.data)
            localStorage.setItem('id', String(response.data.id))
            localStorage.setItem('loggedIn', String(response.data.status))
            localStorage.setItem('name', String(response.data.name))
            localStorage.setItem('isAdmin', String(response.data.permission === "admin"))
            if(response.data.status){
                callback()
            }
        }).catch(e => {
            localStorage.clear()
            localStorage.setItem('loggedIn', 'false')
            error()
        })
    }

    logout = (callback: () => void) => {
        localStorage.clear()
        localStorage.setItem('loggedIn', 'false')
        callback()
    }

    isLoggedIn = () => {
        return localStorage.getItem('loggedIn') === 'true'
    }

    isAdmin = () => {
        return localStorage.getItem('isAdmin') === 'true'
    }

    getCurrentUser = () => {
        return localStorage.getItem('name')
    }
}

export default new Auth()