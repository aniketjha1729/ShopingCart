import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import Profile from './user/Profile';
import UserDashBoard from './user/UserDashBoard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <PrivateRoute path="/user/dashboard" exact component={Signin}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
            </Switch>
        </BrowserRouter>
    )
}

 