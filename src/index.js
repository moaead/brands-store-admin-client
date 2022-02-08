/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect, useHistory} from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Login from "./views/Login/Login";
import axios from "axios";

const hist = createBrowserHistory();
//axios.defaults.baseURL = "http://37.8.123.240:5000/admin";
//axios.defaults.baseURL = "http://localhost:5000/api";
//axios.defaults.baseURL = "https://nofeedo.me:5000/admin";
const baseUrl = "https://brandsstore.co:8080";
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    axios.defaults.baseURL = baseUrl;
}
axios.defaults.withCredentials = true;
export const defaultImageFolder = process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ? baseUrl  : "";
axios.interceptors.response.use(response => {
    return response;
}, err => {
    if (!!err.isAxiosError && !err.response) {
        window.location = "/login";
    }
    return err;
});

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [error, setError] = useState(undefined);
    const handleLogin = (values) => {
        axios.post("/auth/login", values).then((res) => {
            if(res.data.succeeded){
                setError(undefined);
                setIsAuthenticated(true);
                window.location = "/dashboard";
            }else{
                setError({
                    message: "Incorrect Password"
                });
            }
        });
    };
    React.useEffect(() => {

    }, []);
    if (isAuthenticated === undefined) {
        return "Loading...";
    }
    if (!isAuthenticated) {
        return (<Login onLogin={handleLogin} error={error}/>);
    }
    return <Router history={hist}>
        <Switch>
            <Redirect from="/" exact to="/dashboard"/>
            <Route path="/login" render={() => <Login onLogin={handleLogin} error={error}/>}/>
            <Route path="/" component={Admin}/>
        </Switch>
    </Router>
};
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
