import React, {useEffect, useState} from "react";
import UserService from "../service/UserService";
import {Button, Col, Row} from "react-bootstrap";
import Auth from "../service/Auth";
import {Navigate, NavLink} from 'react-router-dom';


const UserDataForm = () => {
    const [state, setState] = useState({
        data: [{
            id: 0,
            username: ''
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