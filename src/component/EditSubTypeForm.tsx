import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
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
                <Col className={'col-6'}>
                    <img src={'/edit_sub_type_title.png'} className={'top-50'}/>
                </Col>
                <Col className={'col-3'}/>
            </Row>
            <Row>
                <Col className={'col-3'}/>
                <Col className={'col-6'}>
                    <Form onSubmit={handleSubmit} className={'top-365'}>
                        <Form.Group className={'form-group'}>
                            <Form.Select className={'transparent_form'} onChange={onChangeType}>
                                <option></option>
                                {
                                    typeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'subType ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Label className={'top-10'}>: البند</Form.Label>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Select className={'transparent_form'} onChange={onChangeSubType}>
                                <option></option>
                                {
                                    subTypeState?.data.map(entry => {
                                        return <option value={entry.code}
                                                       key={'subType ' + entry.code}>{entry.description}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Label className={'top-10'}>:البند الفرعي</Form.Label>
                        </Form.Group>
                        <Form.Group className={'form-group'}>
                            <Form.Control type="number" className={'transparent_form '} name='code' required
                                          defaultValue={subTypeState?.selected === 0 ? undefined : subTypeState?.selected}/>
                            <Form.Label className={'top-10'}>:الرقم المتسلسل</Form.Label>
                        </Form.Group>

                        <Form.Group className={'form-group'}>
                            <Form.Control type="text" className={'transparent_form '} name='description' required
                                          defaultValue={subTypeState?.text}/>
                            <Form.Label className={'top-10'}>:الاسم</Form.Label>
                        </Form.Group>
                        <button type="submit" id={'edit-btn'}>
                            <img src={'/edit_sub_type_button.png'}/>
                        </button>
                    </Form>
                </Col>
                <Col className={'col-3'}/>
            </Row>
        </>
    )
}

export default EditSubTypeForm