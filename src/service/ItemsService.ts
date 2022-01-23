import Url from "./Url";
import axios from "axios";
import OrderResponse from "../model/OrderResponse";
import TypeResponse from "../model/TypeResponse";
import OrderRequest from "../model/OrderRequest";
import UpdateOrderRequest from "../model/UpdateOrderRequest";

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

    patchTypes = (code: number, body: TypeResponse) => {
        return axios.patch<[TypeResponse]>(`${Url.type}/${code}`, body)
    }

    getSubTypes = (type: string) => {
        return axios.get<[TypeResponse]>(`${Url.item}/${type}`)
    }

    postSubTypes = (type: string, body: TypeResponse) => {
        return axios.post<[TypeResponse]>(`${Url.item}/${type}`, body)
    }

    patchSubTypes = (type: number, body: TypeResponse) => {
        return axios.patch<[TypeResponse]>(`${Url.item}/${type}`, body)
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

    patchCategory = (code: number, body: TypeResponse) => {
        console.log(`${Url.category}/${code}`)
        return axios.patch<[TypeResponse]>(`${Url.category}/${code}`, body)
    }

    patchOrder = (body: UpdateOrderRequest) => {
        return axios.patch(Url.order, body)
    }

    deleteOrder = (id: number) => {
        return axios.delete(`${Url.order}/${id}`)
    }

    search = (text : string) => {
        return axios.get<[OrderResponse]>(`${Url.search}?keyword=${text}`)
    }
}

export default ItemsService