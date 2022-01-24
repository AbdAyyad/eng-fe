import axios from "axios";
import UserResponse from "../model/UserResponse";
import Url from "./Url";

class UserService {
    getUsers = () => {
        return axios.get<[UserResponse]>(Url.user)
    }

    deleteUser = (name: string) => {
        return axios.delete(`${Url.user}/${name}`)
    }

    resetPassword = (user: UserResponse) => {
        return axios.patch<UserResponse>(`${Url.user}`, user)
    }
}

export default UserService