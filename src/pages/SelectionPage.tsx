import React from "react";
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";

const SelectionPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-4'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-8'}/>
            </Row>
        </>
    )
}

export default SelectionPage