import React, {useEffect, useState} from "react";
import {Button, Col, Form} from "react-bootstrap";
import TypeResponse from "../model/TypeResponse";
import ItemsService from "../service/ItemsService";
import {useNavigate} from "react-router-dom";

const AddSubTypeForm = () => {
    const navigate = useNavigate()
    const itemService = new ItemsService()

    const [typeState, setTypeState] = useState<{ data: [TypeResponse], selected: number }>()

    useEffect(() => {
        itemService.getTypes().then(r => {
            setTypeState({data: r.data, selected: 0})
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
        itemService.postSubTypes(String(typeState?.selected!!), request).then(r => navigate('/'))
    }

    const onChangeHandler = (e: any) => {
        itemService.getSubTypes(e.target.value).then(r => {
            setTypeState({data: typeState?.data!!, selected: +e.target.value})
        })
    }
    return (
        <>
            <Col className={'3'}/>
            <Col className={'6'}>
                <Form onSubmit={handleSubmit} className={'top-365'}>
                    <Form.Select className={'transparent_form'} onChange={onChangeHandler}>
                        <option></option>
                        {
                            typeState?.data.map(entry => {
                                return <option value={entry.code}
                                               key={'type ' + entry.code}>{entry.description}</option>
                            })
                        }
                    </Form.Select>

                    <Form.Group className={'form-group'}>
                        <Form.Label id={'code'}>code</Form.Label>
                        <Form.Control type="number" className={'transparent_form '} name='code' required/>
                    </Form.Group>

                    <Form.Group className={'form-group'}>
                        <Form.Label id={'description'}>description</Form.Label>
                        <Form.Control type="text" className={'transparent_form '} name='description' required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Type
                    </Button>
                </Form>
            </Col>
            <Col className={'3'}/>
        </>
    )
}

export default AddSubTypeForm