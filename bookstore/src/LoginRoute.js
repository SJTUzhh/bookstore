import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import * as userService from "./services/userService"
import { message } from "antd";
import { adminTypeValue } from './const/Const';

export class LoginRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
            isAdmin: false
        };
    }

    checkAuthAndAdmin = (data) => {
        console.log(data);
        if (data.status >= 0) {
            // WARNING！！！！请不要像下面这样两次setState，这样后面的render会调用两次，出现问题！：
            // this.setState({ isAuthed: true, hasAuthed: true });
            // //检查是否是管理员
            // let userType = JSON.parse(localStorage.getItem("user")).userType;
            // if (userType == adminTypeValue) {
            //     this.setState({ isAdmin: true })
            // } else {
            //     this.setState({ isAdmin: false })
            // }
            //检查是否是管理员
            let userType = JSON.parse(localStorage.getItem("user")).userType;
            if (userType == adminTypeValue) {
                this.setState({ isAuthed: true, hasAuthed: true, isAdmin: true })
            } else {
                this.setState({ isAuthed: true, hasAuthed: true, isAdmin: false })
            }
        } else {
            localStorage.removeItem('user');
            this.setState({ isAuthed: false, hasAuthed: true, isAdmin: false });
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuthAndAdmin);
    }


    render() {

        const { component: Component, path = "/", exact = false, strict = false } = this.props;

        console.log("LoginRoute isAuthed: " + this.state.isAuthed + ", isAdmin: " + this.state.isAdmin);

        if (!this.state.hasAuthed) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => {
            if (this.state.isAuthed && !this.state.isAdmin) {
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            } else if (this.state.isAuthed && this.state.isAdmin) {
                return <Redirect to={{
                    pathname: '/admin',
                    state: { from: props.location }
                }} />
            } else {
                return <Component {...props} />
            }
        }
            // (
            //     this.state.isAuthed ? (
            //         <Redirect to={{
            //             pathname: '/',
            //             state: {from: props.location}
            //         }}/>
            //     ) : (
            //         <Component {...props}/>
            //     )
            // )
        } />
    }
}

export default LoginRoute