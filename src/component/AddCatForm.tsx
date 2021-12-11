import React from "react";
import {Button, Col, Form} from "react-bootstrap";
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
            <Col className={'3'}/>
            <Col className={'6'}>
                <Form onSubmit={handleSubmit} className={'top-365'}>
                    <Form.Group className={'form-group'}>
                        <Form.Label id={'code'}>code</Form.Label>
                        <Form.Control type="number" className={'transparent_form '} name='code' required/>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label id={'description'}>description</Form.Label>
                        <Form.Control type="text" className={'transparent_form '} name='description' required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Category
                    </Button>
                </Form>
            </Col>
            <Col className={'3'}/>
        </>
    )
}

export default AddCatForm