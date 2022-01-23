import React from 'react'
import {Col, Row} from "react-bootstrap";
import LeftPanel from "../component/LeftPanel";
import DashboardTableComponent from "../component/DashboardTableComponent";
import SearchComponent from "../component/SearchComponent";

const SearchPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-4'}>
                    <LeftPanel/>
                </Col>
                <Col className={'col-8'}>
                    <SearchComponent/>
                </Col>
            </Row>
        </>
    )
}

export default SearchPage