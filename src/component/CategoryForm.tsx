import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CategoryForm = () => {
    const navigate = useNavigate()
    return (
        <Row>
            <Form>
                <Row>
                    <Col className={'col-4'}/>
                    <Col className={'col-4'}>
                        <Button variant="primary" type="submit" className={'order_page_btn'}>
                            إضافة و تعديل القائمة
                        </Button>
                    </Col>
                    <Col className={'col-4'}/>
                </Row>
                <Row className={'text-right'}>
                    <Col className={'col-3 text-right'}>
                        <Form.Label className={'top-50'}>:البند الفرعي</Form.Label>
                    </Col>
                    <Col className={'col-3 text-right'}>
                        <Form.Label className={'top-50'}>:البند</Form.Label>
                    </Col>
                    <Col className={'col-3 text-right'}>
                        <Form.Label className={'top-50'}>:التصنيف</Form.Label>
                    </Col>
                    <Col className={'col-3'}/>
                </Row>
                <Row className={'text-right'}>
                    <Col className={'col-3'}>
                        <img src={'/add.png'} className={'bottom-25'}
                             onClick={ ()=>{
                                 navigate('/add-subtype')
                             }}
                        />
                    </Col>
                    <Col className={'col-3'}>
                        <img src={'/add.png'} className={'bottom-25'}
                        onClick={ ()=>{
                            navigate('/add-type')
                        }}
                        />
                    </Col>
                    <Col className={'col-3'}>
                        <img src={'/add.png'} className={'bottom-25'} onClick={() => {
                            navigate('/add-category')
                        }}/>
                    </Col>
                    <Col className={'col-3'}/>
                </Row>
                <Row className={'text-right'}>
                    <Col className={'col-3'}>
                        <img src={'/edit.png'}/>
                    </Col>
                    <Col className={'col-3'}>
                        <img src={'/edit.png'}/>
                    </Col>
                    <Col className={'col-3'}>
                        <img src={'/edit.png'}/>
                    </Col>
                    <Col className={'col-3'}/>
                </Row>
            </Form>
        </Row>
    )
}

export default CategoryForm