import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import UserDataForm from "../component/UserDataForm";
const UserPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-4'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-8'}>
                    <Row>
                        <UserDataForm/>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default UserPage