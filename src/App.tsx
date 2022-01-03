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
import SelectionPage from "./pages/SelectionPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import AddCatFormPage from "./pages/AddCatFormPage";
import AddTypeFormPage from "./pages/AddTypeFormPage";
import AddSubTypeFormPage from "./pages/AddSubTypeFormPage";
import EditSubTypePage from "./pages/EditSubTypePage";
import EditTypePage from "./pages/EditTypePage";
import EditCategoryPage from "./pages/EditCategoryPage";


function App() {
    const loggedIn = Auth.isLoggedIn()
    const routes = [
        {
            path: '/',
            element: loggedIn ? <Navigate to={'/home'}/> : <LoginPage/>
        },
        {
            path: '/home',
            element: loggedIn ? <SelectionPage/> : <LoginPage/>
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
            path: '/category',
            element: loggedIn ? <AddCategoryPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/add-category',
            element: loggedIn ? <AddCatFormPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/add-type',
            element: loggedIn ? <AddTypeFormPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/add-subtype',
            element: loggedIn ? <AddSubTypeFormPage/> : <Navigate to={'/'}/>
        },
        {
            path: '/edit-subtype',
            element: loggedIn ? <EditSubTypePage/> : <Navigate to={'/'}/>
        },
        {
            path: '/edit-type',
            element: loggedIn ? <EditTypePage/> : <Navigate to={'/'}/>
        },
        {
            path: '/edit-category',
            element: loggedIn ? <EditCategoryPage/> : <Navigate to={'/'}/>
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
