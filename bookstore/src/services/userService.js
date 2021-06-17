import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import { adminTypeValue } from '../const/Const';



export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            if(data.data.userType == adminTypeValue){
                history.push("/admin");
            }else{
                history.push("/");
            }           
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const getUserAuths = (data, callback) => {
    const url = `${config.apiUrl}/getUserAuths`;
    postRequest(url, data, callback);
}

export const changeUserAuthEnabled = (data, callback) => {
    const url = `${config.apiUrl}/changeUserAuthEnabled`;
    postRequest_v2(url, data, callback);
}

export const checkUsernameExist = (username, callback) => {
    const data = {username: username};
    const url = `${config.apiUrl}/checkUsernameExist`;
    postRequest_v2(url, data, callback);
}