import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/login';
import RegisterPage from '../components/register';
import DashBoard from '../components/dashboard';

const RouterPages = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path = "/register" component = {RegisterPage}/>
                <PrivateRoute path="/" component={DashBoard} /> 
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    )
}

export default RouterPages;