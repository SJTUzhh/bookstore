import React from 'react';
import { Table } from 'antd';
import Switch from '@material-ui/core/Switch'
import { getUserAuths, changeUserAuthEnabled } from "../services/userService";
import {message} from 'antd';
//import { useTable } from "react-table";

//写成一个受控组件的形式，只会和自己的state同步。除了第一次construct和props的值有关，之后就与props无关了
class CustomSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked};
        this.handleChange = this.handleChange.bind(this);
        this.userId = this.props.userId;
    }

    handleChange(checked) {
        this.setState({ checked: checked});
        let data = {userId: this.userId, enabled: (checked?1:0)}
        const callback = (data) => {
            if(data != null && data.status >= 0){
                message.success(data.msg);
            }
        }
        changeUserAuthEnabled(data, callback);
    }

    render() {
        return <Switch
            checked={this.state.checked}
            onChange={(event) => {
                this.handleChange(event.target.checked)
            }}
        />
    }
}

export class AdminUserList extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Username',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'enabled',
                dataIndex: 'enabled',
                key: 'enabled',
                render: (text, record) => {
                    return <CustomSwitch  
                        checked={record.enabled?true:false}
                        userId={record.userId}
                    />
                }
            },

        ];

        this.state = {
            dataSource: []
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({ dataSource: data });
        };

        getUserAuths({ "search": null }, callback);

    }

    render() {
        return <Table columns={this.columns} dataSource={this.state.dataSource} />
    }

}