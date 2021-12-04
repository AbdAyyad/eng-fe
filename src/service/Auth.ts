import LoginBody from "../model/login-body";
import axios from "axios";
import Url from "./Url";
import LoginResponse from "../model/login-response";
import {useNavigate} from "react-router-dom";

class Auth {

    login = (body: LoginBody, callback: () => void, error: () => void) => {
        console.log(Url.login)
        console.log(body)
        axios.post<LoginResponse>(Url.login, body).then((response) => {
            localStorage.setItem('id', String(response.data.id))
            localStorage.setItem('loggedIn', 'true')
            callback()
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
}

export default new Auth()