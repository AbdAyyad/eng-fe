import React, {FormEvent, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import LoginBody from "../model/login-body";
import Auth from "../service/Auth";
import {useNavigate} from "react-router-dom";


export const LoginPage = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        showError: false
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const html = event.target as HTMLInputElement
        // @ts-ignore
        console.log(html.password.value);
        const loginBody: LoginBody = {
            // @ts-ignore
            username: html.username.value,
            // @ts-ignore
            password: html.password.value
        }
        Auth.login(loginBody, () => {
            navigate('/dashboard')
            console.log('status ', !Auth.isLoggedIn())
            setState({
                showError: !Auth.isLoggedIn()
            })
        }, () => {
            console.log('status ', !Auth.isLoggedIn())
            setState({
                showError: !Auth.isLoggedIn()
            })
        })
    }

    console.log('log in status', state.showError)

    return (
        <>
            <Container>
                <Row>
                    <Col className={'md-2'}/>
                    <Col className={'md-8'}>
                        <Row>
                            <img src={'/Logo-HHEC-250.png'} alt={'logo'}/>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name='username' required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' required/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                            {state.showError ? <h3>login failed</h3> : null}
                        </Row>
                    </Col>
                    <Col className={'md-2'}/>
                </Row>
            </Container>
        </>
    )
}