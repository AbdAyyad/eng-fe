import React, {useEffect, useState} from "react";
import ItemsService from "../service/ItemsService";
import {Col, Row, Form} from "react-bootstrap";
import Url from "../service/Url";

const DashboardTableComponent = () => {
    const itemService = new ItemsService()
    const [state, setState] = useState({
        data: [{
            name: '',
            serial: '',
            type: '',
            phone: '',
            notes: '',
            role: ''
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
            itemService.getTypes().then(r => {
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

    return (
        <Row>
            <Row>
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
                        <th scope="col">email</th>
                        <th scope="col">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.data.map((item, idx) => {
                            return (
                                <tr key={'tr' + idx}>
                                    <th key={idx + 'id' + idx} scope="row">{idx + 1}</th>
                                    <td key={'serial' + item.serial + idx}>{item.serial}</td>
                                    <td key={'name' + item.name + idx}>{item.name}</td>
                                    <td key={'type' + item.type + idx}>{item.type}</td>
                                    <td key={'role' + item.role + idx}>{item.role}</td>
                                    <td key={'phone' + item.phone + idx}>{item.phone}</td>
                                    <td key={'* ' + idx}></td>
                                    <td key={'note' + item.notes + idx}>{item.notes}</td>
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