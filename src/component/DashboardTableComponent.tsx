import React, {useEffect, useRef, useState} from "react";
import ItemsService from "../service/ItemsService";
import {Button, Col, Form, Row} from "react-bootstrap";
import Url from "../service/Url";
import {useReactToPrint} from 'react-to-print';
import TypeResponse from "../model/TypeResponse";
import Auth from "../service/Auth";


const DashboardTableComponent = () => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const admin = Auth.isAdmin()

    const itemService = new ItemsService()
    const [state, setState] = useState({
        data: [{
            name: '',
            serial: '',
            type: '',
            phone: '',
            notes: '',
            role: '',
            id: 0,
            category: '',
            item: '',
            subItem: '',
            email: '',
            sec_phone: '',
            address: ''
        }]
    })

    const [catState, setCatState] = useState<{ data: [TypeResponse], selected: number }>()
    const [typeState, setTypeState] = useState<{ data: [TypeResponse], selected: number }>()
    const [subTypeState, setSubTypeState] = useState<{ data: [TypeResponse], selected: number }>()

    useEffect(() => {
        itemService.getItems().then(r => {
            console.log(r.data)
            setState({
                data: r.data
            })
        })
        itemService.getTypes().then(r => {
            setTypeState({data: r.data, selected: 0})
        })
        itemService.getCategory().then(r => {
            setCatState({data: r.data, selected: 0})
        })
        setSubTypeState({data: [{code: 0, description: ''}], selected: 0})
    }, [])

    const onChangeTypeHandler = (e: any) => {
        console.log(e.target.value)
        const filter = e.target.value
        if (filter != 0) {
            setTypeState({
                data: typeState?.data!!,
                selected: +filter
            })
            itemService.getFilteredItems(e.target.value, catState?.selected, subTypeState?.selected).then(r => {
                setState({
                    data: r.data,
                })
            })
            itemService.getSubTypes(filter as string).then(k => {
                setSubTypeState({
                    data: k.data,
                    selected: 0
                })
            })
        } else {
            itemService.getItems().then(r => {
                setState({
                    data: r.data,
                })
            })
        }
    }

    const onChangeCatHandler = (e: any) => {
        console.log(e.target.value)
        const filter = e.target.value
        if (filter != 0) {
            // @ts-ignore
            setCatState({
                data: catState?.data!!,
                selected: +filter
            })
            itemService.getFilteredItems(typeState?.selected, e.target.value, subTypeState?.selected).then(r => {
                setState({
                    data: r.data,
                })
            })
        } else {
            itemService.getItems().then(r => {
                setState({
                    data: r.data,
                })
            })
        }
    }

    const onChangeSubTypeHandler = (e: any) => {
        console.log(e.target.value)
        const filter = e.target.value
        if (filter != 0) {
            // @ts-ignore
            setSubTypeState({
                data: subTypeState?.data!!,
                selected: +filter
            })
            itemService.getFilteredItems(typeState?.selected, catState?.selected, e.target.value).then(r => {
                setState({
                    data: r.data,
                })
            })
        } else {
            itemService.getItems().then(r => {
                setState({
                    data: r.data,
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

    const onChangeEmail = (id: number, event: any) => {
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.email = event.target.value
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

    const deleteOrder = (id: number) => {
        itemService.deleteOrder(id).then(r => {
            const list = state.data.filter(item => item.id !== id)
            setState({
                data: list,
            })
        })
    }

    return (
        <div>
            <div style={{display: "none"}}>
                <Row ref={componentRef}>
                    <Row className={'print'}>
                        <Row>
                            <Col className={'col-4'}/>
                            <Col className={'col-4'}>
                                <img width={'300px'} height={'150px'} src={'/print_logo.png'}/>
                            </Col>
                            <Col className={'col-4'}/>
                        </Row>
                        <Row>
                            <Col className={'col-1'}/>
                            <Col className={'col-10'}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th scope="col">Serial</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Sub Item</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Second-Mobile</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Address</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        state.data.map((item, idx) => {
                                            return (
                                                <tr key={'tr' + idx}>
                                                    <td key={idx + 'id' + idx} style={{maxWidth: '100px'}}>{idx + 1}</td>
                                                    <td key={'serial' + item.serial + idx}>{item.serial}</td>
                                                    <td key={'name' + item.name + idx}>
                                                        {item.name}
                                                    </td>
                                                    <td key={'category' + item.category + idx}>
                                                        {item.category}
                                                    </td>
                                                    <td key={'item' + item.item + idx}>
                                                        {item.item}
                                                    </td>
                                                    <td key={'subItem' + item.subItem + idx}>
                                                        {item.subItem}
                                                    </td>
                                                    <td key={'role' + item.role + idx}>
                                                        {item.role}
                                                    </td>
                                                    <td key={'phone' + item.phone + idx}>
                                                        {item.phone}
                                                    </td>
                                                    <td key={'email' + item.email + idx}
                                                        style={{textOverflow: 'ellipsis'}}>
                                                        {item.email}
                                                    </td>
                                                    <td key={'sec_phone' + item.sec_phone + idx}>
                                                        {item.sec_phone}
                                                    </td>
                                                    <td key={'notes' + item.notes + idx}>
                                                        {item.notes}
                                                    </td>
                                                    <td key={'address' + item.address + idx}>
                                                        {item.address}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </Col>
                            <Col className={'col-1'}/>
                        </Row>
                        <Row>
                            <Col className={'col-12'}>
                                <img src={'/footer.png'}/>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </div>
            <Row>
                <Row className={'top-100'}>
                    <Col className={'col-3'}>
                        <Form.Select className={'top-15'}
                                     aria-label="Default select example"
                                     onChange={e => onChangeCatHandler(e)}>
                            <option value={0}>filter on category</option>
                            {
                                catState?.data.map((item, idx) => {
                                    return (
                                        <option key={item.code} value={item.code}>{item.description}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'col-3'}>
                        <Form.Select className={'top-15'}
                                     aria-label="Default select example"
                                     onChange={e => onChangeTypeHandler(e)}>
                            <option value={0}>filter on item</option>
                            {
                                typeState?.data.map((item, idx) => {
                                    return (
                                        <option key={item.code} value={item.code}>{item.description}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'col-3'}>
                        <Form.Select className={'top-15'}
                                     aria-label="Default select example"
                                     onChange={e => onChangeSubTypeHandler(e)}>
                            <option value={0}>filter on sub item</option>
                            {
                                subTypeState?.data.map((item, idx) => {
                                    return (
                                        <option key={item.code} value={item.code}>{item.description}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'col-3'}>
                        {
                            admin ? (
                                <div>
                                    <a href={Url.excel}>
                                        <Button className={'btn btn-outline-success top-15 excel'} id={'excel_btn'}>
                                            Excel
                                        </Button>
                                    </a>
                                    <button className={'btn btn-primary top-15'} onClick={handlePrint}>
                                        print
                                    </button>
                                </div>
                            ) : null
                        }
                    </Col>
                </Row>
                <Row className={'overflow'}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Item</th>
                            <th scope="col">Sub Item</th>
                            <th scope="col">Title</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Second-Mobile</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Address</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.data.map((item, idx) => {
                                return (
                                    <tr key={'tr' + idx}>
                                        <th key={idx + 'id' + idx} scope="row">{idx + 1}</th>
                                        <td key={'serial' + item.serial + idx} style={{minWidth: '300px'}}>{item.serial} </td>
                                        <td key={'name' + item.name + idx} style={{minWidth: '300px'}}>
                                            <input type={'text'}
                                                   defaultValue={item.name}
                                                   className={'dashboard-input'}
                                                   onChange={(event => onChangeName(item.id, event))}
                                            />
                                        </td>
                                        <td key={'category' + item.category + idx} style={{minWidth: '300px'}}>
                                            {item.category}
                                        </td>
                                        <td key={'item' + item.item + idx} style={{minWidth: '300px'}}>
                                            {item.item}
                                        </td>
                                        <td key={'subItem' + item.subItem + idx} style={{minWidth: '300px'}}>
                                            {item.subItem}
                                        </td>
                                        <td key={'role' + item.role + idx} style={{minWidth: '300px'}}>
                                            <input type={'text'}
                                                   defaultValue={item.role}
                                                   className={'dashboard-input'}
                                                   onChange={(event => onChangeRole(item.id, event))}/>
                                        </td>
                                        <td key={'phone' + item.phone + idx} style={{minWidth: '300px'}}>
                                            <input type={'tel'}
                                                   pattern={'[0-9]{10}'}
                                                   defaultValue={item.phone}
                                                   className={'dashboard-input'}
                                                   onChange={(event => onChangePhone(item.id, event))}
                                            />
                                        </td>
                                        <td key={'email' + item.email + idx} style={{minWidth: '300px'}}>
                                            <input type={'email'}
                                                   defaultValue={item.email}
                                                   className={'dashboard-input'}
                                                   onChange={(event => onChangeEmail(item.id, event))}
                                                   style={{minWidth: '300px'}}
                                            />
                                        </td>
                                        <td key={'sec_phone' + item.sec_phone + idx} style={{minWidth: '300px'}}>
                                            {item.sec_phone}
                                        </td>
                                        <td key={'notes' + item.notes + idx} style={{minWidth: '300px'}}>
                                            <input type={'notes'}
                                                   defaultValue={item.notes}
                                                   className={'dashboard-input'}
                                                   onChange={(event => onChangeNotes(item.id, event))}
                                                   style={{minWidth: '300px'}}
                                            />
                                        </td>
                                        <td key={'address' + item.address + idx} style={{minWidth: '300px'}}>
                                            {item.address}
                                        </td>
                                        <td>
                                            {
                                                admin ? (
                                                    <>
                                                        <Button className={'btn edit-btn'} onClick={() => {
                                                            updateOrder(item.id)
                                                        }}>Edit</Button>
                                                        <Button className={'btn delete-btn'} onClick={() => {
                                                            const r = window.confirm("Are you sure you want to delete " +
                                                                "this record?");
                                                            if (!r) {
                                                                return false;
                                                            }
                                                            deleteOrder(item.id)
                                                        }}>Delete</Button>
                                                    </>

                                                ) : null
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </Row>
            </Row>
        </div>
    )
}

export default DashboardTableComponent