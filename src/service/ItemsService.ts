import Url from "./Url";
import axios from "axios";
import OrderResponse from "../model/OrderResponse";
import TypeResponse from "../model/TypeResponse";
import OrderRequest from "../model/OrderRequest";
import UpdateOrderRequest from "../model/UpdateOrderRequest";

class ItemsService {

    appendParams = (path: string, paramName: string, paramValue: number) => {
        if (path.indexOf(`?`) === -1) {
            return `${path}?${paramName}=${paramValue}`
        }
        return `${path}&${paramName}=${paramValue}`
    }

    getFilteredItems = (type: number | undefined, cat: number | undefined, item: number | undefined) => {
        let path = `${Url.order}`
        if (type !== undefined && type !== 0) {
            path = this.appendParams(path, 'type', type)
        }
        if (cat !== undefined && cat !== 0) {
            path = this.appendParams(path, 'cat', cat)
        }
        if (item !== undefined && item !== 0) {
            path = this.appendParams(path, 'item', item)
        }

        console.log(path)

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

    search = (text : string,type: number | undefined, cat: number | undefined, item: number | undefined) => {
        let url = `${Url.search}?keyword=${text}`
        if (type !== undefined && type !== 0) {
            url = `${url}&type=${type}`
        }
        if (cat !== undefined && cat !== 0) {
            url = `${url}&cat=${cat}`
        }
        if (item !== undefined && item !== 0) {
            url = `${url}&item=${item}`
        }
        return axios.get<[OrderResponse]>(url)
    }
}

export default ItemsService