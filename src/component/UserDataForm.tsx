import React, {useEffect, useState} from "react";
import UserService from "../service/UserService";
import {Button, Col, Row, Form} from "react-bootstrap";
import Auth from "../service/Auth";
import {NavLink} from 'react-router-dom';


const UserDataForm = () => {
    const [state, setState] = useState({
        data: [{
            id: 0,
            username: '',
            password: '',
            permission: ''
        }]
    })

    const userService = new UserService()

    useEffect(() => {
        userService.getUsers().then(r => {
            setState({
                data: r.data
            })
        })
    }, [])

    const deleteUser = (name: string) => {
        console.log(name)
        userService.deleteUser(name).then(r => {
            const data = state.data.filter(item => item.username !== name)
            setState({data: data})
            if (Auth.getCurrentUser() === name) {
                Auth.logout(() => {
                })
            }
        })
    }

    const onChangePassword = (id: number, event: any) => {
        const idx = state.data.findIndex(item => item.id === id)
        const list = state.data.filter(item => item.id !== id)
        const item = state.data.filter(item => item.id === id)[0]
        item.password = event.target.value
        list.splice(idx, 0, item)
        // setState({
        //     data: list,
        //     filters: state.filters
        // })
        state.data = list
    }

    const onResetPassword = (id: number) => {
        const user = state.data.filter(item => item.id === id)[0]
        userService.resetPassword(user).then(r => {
        })
    }

    return (
        <Row className={'top-50'}>
            <Row>
                <Col className={'col-4'}/>
                <Col className={'col-4'}>
                    <NavLink to={'/create-user'}>
                        <Button className={'btn btn-primary'}>
                            Create User
                        </Button>
                    </NavLink>
                </Col>
                <Col className={'col-4'}/>
            </Row>
            <Row>
                <Col className={'col-12'}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>user name</th>
                            <th>permission</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.data.map((item, idx) => {
                                return (
                                    <tr key={'tr' + idx}>
                                        <td key={idx + 'id' + idx}>{idx + 1}</td>
                                        <td key={'name' + idx}>{item.username}</td>
                                        <td key={'permission' + idx}>{item.permission}</td>
                                        <td key={'reset' + idx}>
                                            <Form.Control
                                                type={'password'}
                                                onChange={(event) => onChangePassword(item.id, event)}
                                            />
                                            <button className={'btn btn-primary'}
                                                    onClick={() => onResetPassword(item.id)}>reset password
                                            </button>
                                        </td>
                                        <td key={'* ' + idx}>
                                            <button className={'btn btn-danger'}
                                                    onClick={() => deleteUser(item.username)}>delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </Col>
            </Row>

        </Row>
    )
}

export default UserDataForm