import React from "react";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import EditTypeForm from "../component/EditTypeForm";

const EditTypePage = () => {
    const navigate = useNavigate()
    return (
        <Row className={'background_page'}>
            <Col className={'col-2'}>
                <img src={'Logo-HHEC-250.png'} alt={'logo'} width={'200'} className={'order_page_logo'} onClick={() => {
                    navigate('/')
                }}/>
            </Col>
            <Col className={'col-10'}>
                <Row>
                    <EditTypeForm/>
                </Row>
            </Col>
        </Row>
    )
}

export default EditTypePage