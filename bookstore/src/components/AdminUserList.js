import React from 'react';
import { Table } from 'antd';
//import { Switch } from '@material-ui/core/Switch'
import { getUserAuths } from "../services/userService";
//import { useTable } from "react-table";


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
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'enabled',
                dataIndex: 'enabled',
                key: 'enabled',
                render: (text, record) => (
                    <button onClick={() => console.log(text)}>
                        {"Button Text"}
                    </button>
                )
            }
        ];

        this.state = {
            dataSource: [
                {
                    userId: 1,
                    username: "thunderboy",
                    enabled: 1
                },
                {
                    userId: 2,
                    username: "userFront2",
                    enabled: 1
                },
                {
                    userId: 3,
                    username: "userFront3",
                    enabled: 1
                }
            ]
        };
    }

    componentDidMount() {
       
        const callback = (data) => {
            console.log(data);
            this.setState({ dataSource: data });
        };

        getUserAuths({ "search": null }, callback);

    }

    render() {
        return <Table columns={this.columns} dataSource={this.state.dataSource} />
    }

}