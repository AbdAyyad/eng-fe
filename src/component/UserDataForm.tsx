import React, {useEffect, useState} from "react";
import UserService from "../service/UserService";
import {Col, Form, Row} from "react-bootstrap";
import Url from "../service/Url";

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

    return (
        <Row>
            <Row>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">user name</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.data.map((item, idx) => {
                            return (
                                <tr key={'tr' + idx}>
                                    <th key={idx + 'id' + idx} scope="row">{idx + 1}</th>
                                    <td key={'name'  + idx}>{item.username}</td>
                                    <td key={'* ' + idx}>
                                        <button className={'btn btn-danger'}>delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </Row>
        </Row>

    )
}

export default UserDataForm