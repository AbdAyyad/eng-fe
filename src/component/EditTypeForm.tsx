import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const EditTypeForm = () => {
    const navigate = useNavigate()
    const itemService = new ItemsService()
    const [state, setState] = useState<{ data: [TypeResponse], selected: number, text: string }>()

    useEffect(() => {
        itemService.getTypes().then(r => {
            setState({
                data: r.data,
                selected: 0,
                text: ''
            })
        })
    }, [])


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const html = event.target as HTMLInputElement
        const request: TypeResponse = {
            // @ts-ignore
            code: html.code.value,
            // @ts-ignore
            description: html.description.value
        }
        itemService.patchTypes(state?.selected!!, request).then(r => navigate('/'))
    }

    const onChangeSerial = (e: any) => {
        const code = +e.target.value;
        const item = state?.data.filter(item => item.code === code)[0]

        setState({
            data: state?.data!!,
            selected: +e.target.value,
            // @ts-ignore
            text: item.description
        })
    }

    return (
        <>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Button className={'top-50 add_filter'}>
                        Edit Type
                    </Button>                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>type:</Form.Label>
                            <Form.Select className={'transparent_form'} onChange={onChangeSerial}>
                                <option></option>
                                {
                                    state?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'subType ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>number:</Form.Label>
                            <Form.Control type="number" className={'transparent_form '} name='code' required
                                          defaultValue={state?.selected === 0 ? undefined : state?.selected}/>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>name:</Form.Label>
                            <Form.Control type="text" className={'transparent_form '} name='description' required
                                          defaultValue={state?.text}/>
                        </Form.Group>
                        <Button type="submit" className={'add_filter_edit'} id={'edit-btn'}>
                            Edit
                        </Button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>
        </>
    )
}

export default EditTypeForm