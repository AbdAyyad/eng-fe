import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import TopBar from "../component/TopBar";
import UserDataForm from "../component/UserDataForm";
const UserPage = () => {
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
                        <UserDataForm/>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default UserPage