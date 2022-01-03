import React, {useEffect, useState} from "react";
import ItemsService from "../service/ItemsService";
import {Col, Row, Form, Button} from "react-bootstrap";
import Url from "../service/Url";
import UpdateOrderRequest from "../model/UpdateOrderRequest";

const DashboardTableComponent = () => {
    const itemService = new ItemsService()
    const [state, setState] = useState({
        data: [{
            name: '',
            serial: '',
            type: '',
            phone: '',
            notes: '',
            role: '',
            id: 0
        }],
        filters: [{
            code: 0,
            description: ''
        }]
    })

    useEffect(() => {
        itemService.getItems().then(r => {
            console.log(r.data)
            const data = r.data
            itemService.getCategory().then(r => {
                setState({
                    data: data,
                    filters: r.data
                })
            })
        })
    }, [])

    const onChangeHandler = (e: any) => {
        console.log(e.target.value)
        const filter = e.target.value
        if (filter != 0) {
            itemService.getItemsByType(e.target.value).then(r => {
                setState({
                    data: r.data,
                    filters: state.filters
                })
            })
        } else {
            itemService.getItems().then(r => {
                setState({
                    data: r.data,
                    filters: state.filters
                })
            })
        }
    }

    const onChangeName = (id: number, event: any) => {
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.name = event.target.value
        list.splice(idx, 0, item)
        // setState({
        //     data: list,
        //     filters: state.filters
        // })
        state.data = list
    }

    const onChangeRole = (id: number, event: any) => {
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.role = event.target.value
        list.splice(idx, 0, item)
        // setState({
        //     data: list,
        //     filters: state.filters
        // })
        state.data = list
    }

    const onChangePhone = (id: number, event: any) => {
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.phone = event.target.value
        list.splice(idx, 0, item)
        // setState({
        //     data: list,
        //     filters: state.filters
        // })
        state.data = list
    }

    const onChangeNotes = (id: number, event: any) => {
        event.preventDefault()
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.notes = event.target.value
        list.splice(idx, 0, item)
        // setState({
        //     data: list,
        //     filters: state.filters
        // })

        state.data = list
    }

    const updateOrder = (id: number) => {
        const item = state.data.filter(item => item.id === id)[0]
        itemService.patchOrder(item).then(r => {
        })
    }

    return (
        <Row>
            <Row className={'top-100'}>
                <Col className={'col-1'}/>
                <Col className={'col-3'}>
                    <Form.Select className={'top-15'}
                                 aria-label="Default select example"
                                 onChange={e => onChangeHandler(e)}>
                        <option value={0}>filter on type</option>
                        {
                            state.filters.map((item, idx) => {
                                return (
                                    <option key={item.code} value={item.code}>{item.description}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Col>
                <Col className={'col-5'}/>
                <Col className={'col-3'}>
                    <button className={'btn btn-outline-success top-15 excel'} id={'excel_btn'}>
                        <a href={Url.excel} className={'excel'}>
                            Excel
                        </a>
                    </button>
                </Col>
            </Row>
            <Row>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Serial</th>
                        <th scope="col">Name</th>
                        <th scope="col">type</th>
                        <th scope="col">Role</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Notes</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.data.map((item, idx) => {
                            return (
                                <tr key={'tr' + idx}>
                                    <th key={idx + 'id' + idx} scope="row">{idx + 1}</th>
                                    <td key={'serial' + item.serial + idx}>{item.serial}</td>
                                    <td key={'name' + item.name + idx}>
                                        <input type={'text'}
                                               defaultValue={item.name}
                                               className={'dashboard-input'}
                                               onChange={(event => onChangeName(item.id, event))}
                                        />
                                    </td>
                                    <td key={'type' + item.type + idx}>
                                        {item.type}
                                    </td>
                                    <td key={'role' + item.role + idx}>
                                        <input type={'text'}
                                               defaultValue={item.role}
                                               className={'dashboard-input'}
                                               onChange={(event => onChangeRole(item.id, event))}/>
                                    </td>
                                    <td key={'phone' + item.phone + idx}>
                                        <input type={'number'}
                                               defaultValue={item.phone}
                                               className={'dashboard-input'}
                                               onChange={(event => onChangePhone(item.id, event))}
                                        />
                                    </td>
                                    <td key={'note' + item.notes + idx}>
                                        <input type={'text'}
                                               defaultValue={item.notes}
                                               className={'dashboard-input'}
                                               onChange={(event => onChangeNotes(item.id, event))}
                                        />
                                    </td>
                                    <td>
                                        <Button className={'btn edit-btn'} onClick={() => {
                                            updateOrder(item.id)
                                        }}>تعديل</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </Row>
        </Row>
    )
}

export default DashboardTableComponent