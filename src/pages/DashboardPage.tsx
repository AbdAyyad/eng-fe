import React from 'react'
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import DashboardTableComponent from "../component/DashboardTableComponent";
import TopBar from "../component/TopBar";

const DashboardPage = () => {
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
                    <DashboardTableComponent/>
                </Col>
            </Row>
        </>
    )
}

export default DashboardPage