import React, {FormEvent, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import LoginResponse from "../model/login-response";
import Url from "../service/Url";
import LoginBody from "../model/login-body";

const UserForm = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        errorMessage: false
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const html = event.target
        const loginBody: LoginBody = {
            // @ts-ignore
            username: html.username.value,
            // @ts-ignore
            password: html.password.value
        }
        const config = {
            headers: {
                admin_id: '1'
            }
        }

        axios.post<LoginResponse>(Url.createUser, loginBody, config).then((response) => {
            navigate('/dashboard')

        }).catch(e => {
            setState({
                errorMessage: true
            })

        })
        console.log('relod')
    }
    return (
        <Row>
            <Col className={'md-2'}/>
            <Col className={'md-8'}>
                <Row>
                    <img src={'/Logo-HHEC-250.png'} alt={'logo'}/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create User
                        </Button>
                    </Form>
                    {state.errorMessage ? <h3>operation failed</h3> : null}
                </Row>
            </Col>
            <Col className={'md-2'}/>
        </Row>
    )
}

export default UserForm