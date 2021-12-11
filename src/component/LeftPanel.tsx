import React from "react";
import {NavLink} from "react-router-dom";

const LeftPanel = () => {
    return (
        <>
            <div id={'sidebar'}>
                <ul className={'navbar-nav mr-auto '}>
                    <li className={'nav-item active'}>
                        <NavLink to={'/'} className={'nav-link background'}>
                            <img src={'Logo-HHEC-250.png'} alt={'logo'} width={'220'}/>
                        </NavLink>
                    </li>

                    <li className={'nav-item'} id={'add_data'}>
                        <NavLink to={'/new-order'} className={'nav-link'}>
                            <h4 id={'add_data_text'}>إدخال بيانات</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'} id={'contractors'}>
                        <NavLink to={'/dashboard'} className={'nav-link'}>
                            <h4>شجرة اسماء الموردين</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'} id={'settings'}>
                        <NavLink to={'/user'} className={'nav-link'}>
                            <h4>الإعدادات</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'} id={'add_data'}>
                        <NavLink to={'/category'} className={'nav-link'}>
                            <h4>إضافة و تعديل التصنيفات</h4>
                        </NavLink>
                    </li>

                    <li className={'nav-item'} id={'search'}>
                        <NavLink className={'nav-link'} to={'/'}>
                            <h4>بحث</h4>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default LeftPanel