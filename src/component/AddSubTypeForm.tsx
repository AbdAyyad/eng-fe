import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const AddSubTypeForm = () => {
    const navigate = useNavigate()
    const itemService = new ItemsService()

    const [typeState, setTypeState] = useState<{ data: [TypeResponse], selected: number }>()

    useEffect(() => {
        itemService.getTypes().then(r => {
            setTypeState({data: r.data, selected: 0})
        })
    }, [])


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const html = event.target as HTMLInputElement
        const request: TypeResponse = {
            // @ts-ignore
            code: html.code.value,
            // @ts-ignore
            description: html.description.value
        }
        itemService.postSubTypes(String(typeState?.selected!!), request).then(r => navigate('/'))
    }

    const onChangeHandler = (e: any) => {
        itemService.getSubTypes(e.target.value).then(r => {
            setTypeState({data: typeState?.data!!, selected: +e.target.value})
        })
    }
    return (
        <>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <img src={'/add_sub_type_title.png'} className={'top-50'}/>
                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Select className={'transparent_form'} onChange={onChangeHandler}>
                                <option></option>
                                {
                                    typeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'type ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Label className={'top-10'}>: البند</Form.Label>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Control type="number" className={'transparent_form '} name='code' required/>
                            <Form.Label className={'top-10'}>: السيريال</Form.Label>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Control type="text" className={'transparent_form '} name='description' required/>
                            <Form.Label className={'top-10'}>: الوصف</Form.Label>
                        </Form.Group>
                        <button type="submit" id={'edit-btn'}>
                            <img src={'/add_sub_type_button.png'}/>
                        </button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>
        </>
    )
}

export default AddSubTypeForm