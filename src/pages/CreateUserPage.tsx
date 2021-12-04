import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import TopBar from "../component/TopBar";
import UserForm from "../component/UserForm";

const CreateUserPage = () => {
    return (
        <>
            <Row>
                <Col className={'col-2'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-10'}>
                    <Row>
                        <TopBar/>
                    </Row>
                    <Row>
                        <UserForm/>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default CreateUserPage