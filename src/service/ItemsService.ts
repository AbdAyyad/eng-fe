import Url from "./Url";
import axios from "axios";
import OrderResponse from "../model/OrderResponse";
import TypeResponse from "../model/TypeResponse";
import OrderRequest from "../model/OrderRequest";

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
        return axios.get<[TypeResponse]>(Url.type)
    }

    getSubTypes = (type: string) => {
        return axios.get<[TypeResponse]>(`${Url.item}/${type}`)
    }

    getCategory = () => {
        return axios.get<[TypeResponse]>(Url.category)
    }

    postOrder = (body: OrderRequest) => {
        return axios.post(Url.order, body)
    }
}

export default ItemsService