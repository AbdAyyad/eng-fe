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
            navigate('/home')
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
                <Row id={'login_page'}>
                    <Col className={'col-1'}/>
                    <Col className={'col-9'}>
                        <Row>
                            <Row>
                                <img src={'/Logo-HHEC-250.png'} alt={'logo'} width={'250px'} id={'logo'}/>
                            </Row>
                            <Row>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3 flex" controlId="formBasicEmail">
                                        <Form.Label className={'form_label'}>Username</Form.Label>
                                        <Form.Control type="text" className={'login-form'} name='username'
                                                      required/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 flex" controlId="formBasicPassword">
                                        <Form.Label className={'form_label'}>Password</Form.Label>
                                        <Form.Control type="password" className={'login-form'}  name='password' required/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" id={'login_button'}>
                                        Login
                                    </Button>
                                </Form>
                                {state.showError ? <h3>login failed</h3> : null}
                            </Row>
                        </Row>
                    </Col>
                    <Col className={'col-2'}/>
                </Row>
            </Container>
        </>
    )
}