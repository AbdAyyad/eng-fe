import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Auth from "../service/Auth";
import {useNavigate} from "react-router-dom";

export const LogoutPage = () => {
    const navigator = useNavigate()
    Auth.logout(() => {

    })
    setTimeout(() => {
        navigator('/dashboard')
    }, 100)

    return (
        <>
            <Container>
                <Row className={'background_page'}>
                    <Col className={'md-2'}/>
                    <Col className={'md-8'}>
                        <Row>
                            <img src={'/Logo-HHEC-250.png'} alt={'logo'}/>
                            <h3>logout successful</h3>
                        </Row>
                    </Col>
                    <Col className={'md-2'}/>
                </Row>
            </Container>
        </>
    )
}