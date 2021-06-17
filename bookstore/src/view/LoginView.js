import React from 'react';
import WrappedLoginForm from '../components/LoginForm';
import WrappedRegisterForm from '../components/RegisterForm';
import {withRouter} from "react-router-dom";



class LoginView extends React.Component{ 
    render(){
        const pathname = this.props.location.pathname;
        const form = (pathname == "/login") ? <WrappedLoginForm /> : <WrappedRegisterForm/>;
        const title = (pathname == "/login") ? "Login" : "Register";
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">{title}</h1>
                        <div className="login-content">
                            {form}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(LoginView);