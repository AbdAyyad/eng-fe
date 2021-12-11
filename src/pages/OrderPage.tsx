import React from "react";
import {Col, Row} from "react-bootstrap";
import OrderForm from "../component/OrderForm";

const OrderPage = () => {
    return (
        <>
            <Row className={'background_page'}>
                <Col className={'col-2'}>
                    <img src={'Logo-HHEC-250.png'} alt={'logo'} width={'200'} className={'order_page_logo'}/>
                </Col>
                <Col className={'col-10'}>
                    <Row>
                        <OrderForm/>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default OrderPage