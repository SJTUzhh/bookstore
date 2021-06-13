import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./services/userService"
import {message} from "antd";
import { adminTypeValue } from './const/Const';

export default class AdminRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
            isAdmin: false
        };
    }

    checkAuthAndAdmin = (data) => {
        if (data.status >= 0) {
            //检查是否是管理员
            let userType = JSON.parse(localStorage.getItem("user")).userType;
            if (userType == adminTypeValue) {
                this.setState({ isAuthed: true, hasAuthed: true, isAdmin: true })
            } else {
                this.setState({ isAuthed: true, hasAuthed: true, isAdmin: false })
            }
        } else {
            message.error(data.msg);
            localStorage.removeItem('user');
            this.setState({isAuthed: false, hasAuthed: true, isAdmin: false});
        }
    };

    componentDidMount() {
        userService.checkSession(this.checkAuthAndAdmin);
    }


    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;

        if (!this.state.hasAuthed) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            (this.state.isAuthed && this.state.isAdmin)? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

