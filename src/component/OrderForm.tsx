import React, {FormEvent} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const OrderForm = () => {
    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent) => {
        console.log('relod')
        event.preventDefault()
        navigate('/dashboard')
    }
    return (<Row>
            <Col className={'md-2'}/>
            <Col className={'md-8'}>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label className={'top-15'}>Item</Form.Label>
                        <Row>
                            <Col className={'col-4'}><Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select></Col>
                            <Col className={'col-4'}><Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select></Col>
                            <Col className={'col-4'}>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name='name' required/>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>role</Form.Label>
                            <Form.Control type="text" placeholder="role" name='role' required/>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>phone</Form.Label>
                            <Form.Control type="number" placeholder="phone" name='phone' required/>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>notes</Form.Label>
                            <Form.Control type="text" placeholder="notes" name='notes' required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create User
                        </Button>
                    </Form>
                </Row>
            </Col>
            <Col className={'md-2'}/>
        </Row>
    )
}

export default OrderForm