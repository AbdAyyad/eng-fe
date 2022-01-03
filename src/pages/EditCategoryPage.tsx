import React from "react";
import {useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import EditCategoryForm from "../component/EditCategoryForm";

const EditCategoryPage = () => {
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
                    <EditCategoryForm/>
                </Row>
            </Col>
        </Row>
    )
}

export default EditCategoryPage