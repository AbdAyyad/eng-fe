import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, useRoutes} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage";
import Auth from "./service/Auth";
import DashboardPage from "./pages/DashboardPage";
import {Container} from "react-bootstrap";
import {LogoutPage} from "./pages/LogoutPage";
import CreateUserPage from "./pages/CreateUserPage";
import OrderPage from "./pages/OrderPage";
import UserPage from "./pages/UserPage";


function App() {
    const loggedIn = Auth.isLoggedIn()
    const routes = [
        {
            path: '/',
            element: loggedIn ? <Navigate to={'/dashboard'}/> : <LoginPage/>
        },
        {
            path: '/dashboard',
            element: loggedIn ? <DashboardPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/create-user',
            element: loggedIn ? <CreateUserPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/new-order',
            element: loggedIn ? <OrderPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/user',
            element: loggedIn ? <UserPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/log-out',
            element: loggedIn ? <LogoutPage/> : <Navigate to={'/'}/>
        },
        {
            path: '*',
            element: <Navigate to={'/'}/>
        }
    ]

    return useRoutes(routes)
}

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <Container fluid={true}>
                <App/>
            </Container>
        </BrowserRouter>
    )
}

export default AppWrapper;
