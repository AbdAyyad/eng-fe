import React from "react";
import {Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const LeftPanel = () => {
    return (
        <>
            <Row>
                <ul className={'navbar-nav mr-auto background'}>
                    <li className={'nav-item active'}>
                        <NavLink to={'/dashboard'} className={'nav-link'}>
                            <img src={'Logo-HHEC-250.png'} alt={'logo'} width={'200'}/>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink to={'/dashboard'} className={'nav-link'}>
                            <h4>dashboard</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink to={'/user'} className={'nav-link'}>
                            <h4>users</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink to={'/create-user'} className={'nav-link'}>
                            <h4>create user</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink to={'/new-order'} className={'nav-link'}>
                            <h4>new order</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink className={'nav-link'} to={'/log-out'}>
                            <h4>log out</h4>
                        </NavLink>
                    </li>

                </ul>

            </Row>
        </>
    )
}

export default LeftPanel