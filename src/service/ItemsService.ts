import Url from "./Url";
import axios from "axios";
import OrderResponse from "../model/OrderResponse";
import TypeResponse from "../model/TypeResponse";

class ItemsService {
    getItemsByType = (type: string) => {
        let path = `${Url.order}?type=${type}`
        return axios.get<[OrderResponse]>(path)
    }

    getItems = () => {
        const path = Url.order

        return axios.get<[OrderResponse]>(path)
    }

    getTypes = () => {
        return axios.get<[TypeResponse]>(Url.category)
    }
}

export default ItemsService