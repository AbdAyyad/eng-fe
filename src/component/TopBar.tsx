import React from "react";
import {Button, Form, Row, Col} from "react-bootstrap";

const TopBar = () => {
    return (
        <>
            <nav className="navbar-light bg-light">
                <Row>
                    <Col className={'col-2 top-15'}>
                        <a className="navbar-brand top-15" >user</a>
                    </Col>
                    <Col className={'col-6'}/>
                    <Col className={'col-4'}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Row>
                                    <Col className={'col-8'}>
                                        <Form.Control type="text" className={'top-15'} placeholder="Search"
                                                      name='username'/>
                                    </Col>
                                    <Col className={'col-4'}>
                                        <Button variant="primary" className={'top-15'} type="submit">
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </nav>
        </>
    )
}

export default TopBar