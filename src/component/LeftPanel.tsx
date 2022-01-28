import React from "react";
import {NavLink} from "react-router-dom";
import Auth from "../service/Auth";

const LeftPanel = () => {
    const admin = Auth.isAdmin()

    return (
        <>
            <div id={'sidebar'}>
                <ul className={'navbar-nav mr-auto '}>
                    <li className={'nav-item active'}>
                        <NavLink to={'/'} className={'nav-link background'}>
                            <img src={'Logo-HHEC-250.png'} alt={'logo'} width={'220'}/>
                        </NavLink>
                    </li>

                    {
                        admin ? (
                            <li className={'nav-item'} id={'add_data'}>
                                <NavLink to={'/new-order'} className={'nav-link'}>
                                    <h4 id={'add_data_text'}>Add data</h4>
                                </NavLink>
                            </li>
                        ) : null
                    }

                    <li className={'nav-item'} id={'contractors'}>
                        <NavLink to={'/dashboard'} className={'nav-link'}>
                            <h4>Contractors list</h4>
                        </NavLink>
                    </li>

                    {
                        admin ? (
                            <li className={'nav-item'} id={'settings'}>
                                <NavLink to={'/user'} className={'nav-link'}>
                                    <h4>Settings</h4>
                                </NavLink>
                            </li>
                        ) : null
                    }

                    {
                        admin ? (
                            <li className={'nav-item'} id={'add_data'}>
                                <NavLink to={'/category'} className={'nav-link'}>
                                    <h4>Add & Edit Category</h4>
                                </NavLink>
                            </li>
                        ) : null
                    }


                    <li className={'nav-item'} id={'search'}>
                        <NavLink className={'nav-link'} to={'/search'}>
                            <h4>Search</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'}>
                        <NavLink className={'nav-link'} to={'/log-out'}>
                            <img width={'450px'} height={'75px'}  src={'/login_button.png'}/>
                            <h4 className={'logout'}>Logout</h4>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default LeftPanel