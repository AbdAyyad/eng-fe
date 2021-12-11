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

    postTypes = (body: TypeResponse) => {
        return axios.post<[TypeResponse]>(Url.type, body)
    }

    getSubTypes = (type: string) => {
        return axios.get<[TypeResponse]>(`${Url.item}/${type}`)
    }

    postSubTypes = (type: string, body: TypeResponse) => {
        return axios.post<[TypeResponse]>(`${Url.item}/${type}`, body)
    }

    getCategory = () => {
        return axios.get<[TypeResponse]>(Url.category)
    }

    postCategory = (body: TypeResponse) => {
        return axios.post<[TypeResponse]>(Url.category, body)
    }

    postOrder = (body: OrderRequest) => {
        return axios.post(Url.order, body)
    }
}

export default ItemsService