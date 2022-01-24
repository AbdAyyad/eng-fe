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
                    <Button className={'top-50 add_filter'}>
                        Add Item
                    </Button>
                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>category:</Form.Label>
                            <Form.Select className={'transparent_form'} onChange={onChangeHandler}>
                                <option></option>
                                {
                                    typeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'type ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>number:</Form.Label>
                            <Form.Control type="number" className={'transparent_form '} name='code' required/>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>description:</Form.Label>
                            <Form.Control type="text" className={'transparent_form '} name='description' required/>
                        </Form.Group>
                        <Button type="submit" className={'add_filter_plus'} id={'edit-btn'}>
                            Add
                        </Button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>
        </>
    )
}

export default AddSubTypeForm