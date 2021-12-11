import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import UserForm from "../component/UserForm";

const CreateUserPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-2'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-10'}>
                    <Row>
                        <UserForm/>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default CreateUserPage