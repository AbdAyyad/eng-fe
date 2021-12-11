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
            notes: html.notes.value
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
                            إدخال بيانات
                        </Button>
                    </Col>
                    <Col className={'col-4'}/>
                </Row>
                <Row>
                    <Col className={'col-4 text-right'}>
                        <Form.Label className={'top-50'}>:البند الفرعي</Form.Label>
                    </Col>
                    <Col className={'col-4 text-right'}>
                        <Form.Label className={'top-50'}>:البند</Form.Label>
                    </Col>
                    <Col className={'col-4 text-right'}>
                        <Form.Label className={'top-50'}>:التصنيف</Form.Label>
                    </Col>
                </Row>

                <Row>
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
                </Row>


                <Form.Group className="form-group text-right">
                    <Form.Control className={'transparent_form'}
                                  type="text"
                                  disabled
                                  name='serial'
                                  value={serial}
                    />
                    <Form.Label className={'left-15'}>:السيريال</Form.Label>
                </Form.Group>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Control className={'transparent_form'} type="text"
                                          name='role'
                                          required/>
                            <Form.Label className={'left-15'}>:المهنة</Form.Label>
                        </Form.Group>
                    </Col>

                    <Col className={'col-6'}><Form.Group className="form-group">
                        <Form.Control className={'transparent_form'} type="text" name='name'
                                      required/>
                        <Form.Label className={'left-15'}>:الاسم</Form.Label>
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Control className={'transparent_form'} type="text" name='address'
                                          required/>
                            <Form.Label className={'left-15'}>:العنوان</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col className={'col-6'}>
                        <Form.Group className="form-group">
                            <Form.Control className={'transparent_form'} type="number" name='phone'
                                          required/>
                            <Form.Label className={'left-15'} id={'phone'}>:رقم التلفون</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="form-group">
                    <textarea className={'transparent_form'} cols={200} rows={5} name='notes'></textarea>
                    <Form.Label className={'left-15'}>:الملاحظات</Form.Label>
                </Form.Group>

            </Form>
        </Row>
    )
}

export default OrderForm