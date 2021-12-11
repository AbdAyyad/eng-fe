import React from 'react'
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import DashboardTableComponent from "../component/DashboardTableComponent";

const DashboardPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-4'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-8'}>
                    <DashboardTableComponent/>
                </Col>
            </Row>
        </>
    )
}

export default DashboardPage