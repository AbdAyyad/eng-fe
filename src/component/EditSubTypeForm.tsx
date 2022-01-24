import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const EditSubTypeForm = () => {
    const navigate = useNavigate()
    const itemService = new ItemsService()
    const [typeState, setTypeState] = useState<{ data: [TypeResponse], selected: string, text: string }>()
    const [subTypeState, setSubTypeState] = useState<{ data: [TypeResponse], selected: number, text: string }>()

    useEffect(() => {
        itemService.getTypes().then(r => {
            setTypeState({
                data: r.data,
                selected: '',
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
        itemService.patchSubTypes(subTypeState?.selected!!, request).then(r => navigate('/'))
    }

    const onChangeType = (e: any) => {
        const code = e.target.value;

        itemService.getSubTypes(code).then(r => {
            console.log(r.data)
            setSubTypeState({
                data: r.data,
                selected: 0,
                text: ''
            })
            setTypeState({
                data: typeState?.data!!,
                selected: code,
                text: ''
            })
        })
    }

    const onChangeSubType = (e: any) => {
        const code = e.target.value;
        console.log(code)
        console.log(subTypeState?.data)
        const item = subTypeState?.data.filter(item => item.code === +code)[0]
        console.log(item)
        setSubTypeState({
            data: subTypeState?.data!!,
            selected: +e.target.value,
            // @ts-ignore
            text: item.description
        })

    }


    return (
        <>
            <Row>
                <Col className={'col-3'}/>
                <Button className={'top-50 add_filter'}>
                    Edit Item
                </Button>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>type:</Form.Label>
                            <Form.Select className={'transparent_form'} onChange={onChangeType}>
                                <option></option>
                                {
                                    typeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'subType ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>subtype:</Form.Label>
                            <Form.Select className={'transparent_form'} onChange={onChangeSubType}>
                                <option></option>
                                {
                                    subTypeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'subType ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>number:</Form.Label>
                            <Form.Control type="number" className={'transparent_form '} name='code' required
                                          defaultValue={subTypeState?.selected === 0 ? undefined : subTypeState?.selected}/>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Label className={'top-10 right-15'}>name:</Form.Label>
                            <Form.Control type="text" className={'transparent_form '} name='description' required
                                          defaultValue={subTypeState?.text}/>
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

export default EditSubTypeForm