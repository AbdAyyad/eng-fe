import React, {FormEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import OrderRequest from "../model/OrderRequest";

const OrderForm = () => {
    const navigate = useNavigate()

    const [catState, setCatState] = useState<{ data: [TypeResponse], selected: number }>()
    const [typeState, setTypeState] = useState<{ data: [TypeResponse], selected: number }>()
    const [subTypeState, setSubTypeState] = useState<{ data: [TypeResponse], selected: number }>()
    const [serial, setSerial] = useState<string>('')

    const itemService = new ItemsService()

    useEffect(() => {
        itemService.getTypes().then(r => {
            setTypeState({data: r.data, selected: 0})
        })
        itemService.getCategory().then(r => {
            setCatState({data: r.data, selected: 0})
        })
        setSubTypeState({data: [{code: 0, description: ''}], selected: 0})
    }, [])

    const onChangeCat = (e: any) => {
        setCatState({data: catState?.data!!, selected: +e.target.value})
        setSerial(`${+e.target.value}-${typeState?.selected}-${subTypeState?.selected}`)
    }

    const onChangeHandler = (e: any) => {
        itemService.getSubTypes(e.target.value).then(r => {
            setTypeState({data: typeState?.data!!, selected: +e.target.value})
            setSubTypeState({data: r.data, selected: 0})
            setSerial(`${catState?.selected}-${+e.target.value}-${subTypeState?.selected}`)

        })
    }

    const onChangeSerial = (e: any) => {
        setSubTypeState({data: subTypeState?.data!!, selected: +e.target.value})
        setSerial(`${catState?.selected}-${typeState?.selected}-${+e.target.value}`)
    }


    const submitOrder = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const html = event.target as HTMLInputElement
        const request: OrderRequest = {
            // @ts-ignore
            address: html.address.value,
            // @ts-ignore
            phone: html.phone.value,
            // @ts-ignore
            name: html.name.value,
            // @ts-ignore
            role: html.role.value,
            category_code: catState?.selected!!,
            item_code: subTypeState?.selected!!,
            // @ts-ignore
            notes: html.notes.value,
            // @ts-ignore
            company: html.company.value,
            // @ts-ignore
            company_cat: html.company_cat.value,
            // @ts-ignore
            email: html.email.value,
            // @ts-ignore
            sec_phone: html.sec_phone.value
        }
        console.log(request)
        itemService.postOrder(request).then(r => navigate('/'))
    }

    return (
        <Row>
            <Form onSubmit={submitOrder}>
                <Row>
                    <Col className={'col-4'}/>
                    <Col className={'col-4'}>
                        <Button variant="primary" type="submit" className={'order_page_btn'}>
                            New Data
                        </Button>
                    </Col>
                    <Col className={'col-4'}/>
                </Row>
                <Row>
                    <Col className={'col-4 text-left'}>
                        <Form.Label className={'top-50'}>Category:</Form.Label>
                    </Col>
                    <Col className={'col-4 text-left'}>
                        <Form.Label className={'top-50'}>Item:</Form.Label>
                    </Col>
                    <Col className={'col-4 text-left'}>
                        <Form.Label className={'top-50'}>Sub-item:</Form.Label>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-4'}>
                        <Form.Select className={'transparent_form'} onChange={onChangeCat}>
                            <option></option>
                            {

                                catState?.data.map(entry => {
                                    return <option value={entry.code}
                                                   key={'cat ' + entry.code}>{entry.description}</option>
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col className={'col-4'}>
                        <Form.Select className={'transparent_form'} onChange={onChangeHandler}>
                            <option></option>
                            {
                                typeState?.data.map(entry => {
                                    return <option value={entry.code}
                                                   key={'type ' + entry.code}>{entry.description}</option>
                                })
                            }
                        </Form.Select></Col>
                    <Col className={'col-4'}>
                        <Form.Select className={'transparent_form'} onChange={onChangeSerial}>
                            <option></option>
                            {
                                subTypeState?.data.map(entry => {
                                    return <option value={entry.code}
                                                   key={'subType ' + entry.code}>{entry.description}</option>
                                })
                            }
                        </Form.Select>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>Company:</Form.Label>
                            <Form.Control className={'transparent_form'} type="text"
                                          name='company'
                                          required/>
                        </Form.Group>
                    </Col>

                    <Col className={'col-6'}><Form.Group className="form-group">
                        <Form.Label className={'right-15'}>Company Catg:</Form.Label>
                        <Form.Control className={'transparent_form'}
                                      type="text"
                                      name='company_cat'
                                      required/>
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>Number:</Form.Label>
                            <Form.Control className={'transparent_form'}
                                          type="number"
                                          name='phone'
                                          required/>
                        </Form.Group>
                    </Col>

                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>Email:</Form.Label>
                            <Form.Control className={'transparent_form'}
                                      type="email"
                                      name='email'
                                      required/>
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>Name:</Form.Label>
                            <Form.Control className={'transparent_form'}
                                          type="text"
                                          name='name'
                                          required/>
                        </Form.Group>
                    </Col>

                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>role:</Form.Label>
                            <Form.Control className={'transparent_form'}
                                          type="text"
                                          name='role'
                                          required/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'}>Address:</Form.Label>
                            <Form.Control className={'transparent_form'} type="text" name='address'
                                          required/>
                        </Form.Group>
                    </Col>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Label className={'right-15'} id={'phone'}>Mob.number:</Form.Label>
                            <Form.Control className={'transparent_form'} type="number" name='sec_phone'
                                          required/>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="form-group">
                    <Form.Label className={'right-15'}>Notes :</Form.Label>
                    <textarea className={'transparent_form'} cols={200} rows={5} name='notes'></textarea>
                </Form.Group>

            </Form>
        </Row>
    )
}

export default OrderForm