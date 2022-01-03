import React from "react";
import {Row, Col, Form} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const AddCatForm = () => {
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
        itemService.postCategory(request).then(r => navigate('/'))
    }
    return (
        <>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <img src={'/add_cat_title.png'} className={'top-50'}/>
                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Control type="number" className={'transparent_form '} name='code' required/>
                            <Form.Label className={'top-10'}>:الرقم المتسلسل</Form.Label>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Control type="text" className={'transparent_form '} name='description' required/>
                            <Form.Label className={'top-10'}>: الاسم</Form.Label>
                        </Form.Group>
                        <button type="submit" id={'edit-btn'}>
                            <img src={'/add_cat_button.png'}/>
                        </button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>
        </>
    )
}

export default AddCatForm