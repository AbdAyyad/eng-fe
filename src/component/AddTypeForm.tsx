import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const AddTypeForm = () => {
    const navigate = useNavigate()
    const itemService = new ItemsService()

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const html = event.target as HTMLInputElement
        const request: TypeResponse = {
            // @ts-ignore
            code: html.code.value,
            // @ts-ignore
            description: html.description.value
        }
        itemService.postTypes(request).then(r => navigate('/'))
    }
    return (
        <>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Col className={'col-6'}>
                        <Button className={'top-50 add_filter'}>
                            Add Type
                        </Button>
                    </Col>                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>number:</Form.Label>
                            <Form.Control type="number" className={'transparent_form '} name='code' required/>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>name</Form.Label>
                            <Form.Control type="text" className={'transparent_form '} name='description' required/>
                        </Form.Group>
                        <Button type="submit" className={'add_filter_plus'} id={'edit-btn'}>
                            Add
                        </Button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>s
        </>
    )
}

export default AddTypeForm