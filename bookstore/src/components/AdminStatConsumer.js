import React from 'react';
import { Table, Button } from 'antd';
import { adminGetOrderInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class AdminStatConsumer extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '用户 ID',
                dataIndex: 'userId',
                key: 'userId',
                render: text => <a>{text}</a>
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '总消费',
                dataIndex: 'totalCost',
                key: 'totalCost',
                defaultSortOrder: 'descend',
                render: (text) => {
                    return text.toFixed(2);
                },
                sorter: (a, b) => (a.totalCost - b.totalCost)
            },
        ];

        this.state = {
            datetimeRange: [new Date(1609488000 * 1000), new Date()],
            consumerData: []
        };
    }

    componentDidMount() {

        this.handleFilterClick();

    }

    handlePickerChange = (value) => {
        this.setState({ datetimeRange: value });
    }

    handleFilterClick = () => {
        const callback = (data) => {
            this.getConsumerData(data);
        }
        const datetimeRange = this.state.datetimeRange;
        const beginTimestamp = datetimeRange == null ? 0.0 : datetimeRange[0].getTime();
        const endTimestamp = datetimeRange == null ? 0.0 : datetimeRange[1].getTime();

        adminGetOrderInfos({ "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp }, callback);
    }

    getConsumerData = (data) => {
        let consumerData = [];
        for (let i = 0; i < data.length; i++) {
            let userId = data[i].userId;
            let existedInConsumerData = false;
            //遍历consumerData，查看userId对应的数据是否已经添加到了consumerData中
            //若已经添加，则直接加
            for (let j = 0; j < consumerData.length; j++) {
                if (consumerData[j].userId == userId) {
                    consumerData[j].totalCost += data[i].cost//.bookPrice * data[i].count;
                    existedInConsumerData = true;
                    break;
                }
            }
            //否则，插入
            if (!existedInConsumerData) {
                consumerData.push({
                    userId: data[i].userId,
                    username: data[i].username,
                    totalCost: data[i].cost
                })
            }
        }
        this.setState({ consumerData: consumerData });
    }

    render() {

        return (
            <div>
                <div>
                    <DateTimeRangePicker
                        onChange={this.handlePickerChange}
                        value={this.state.datetimeRange}
                        format={"y-MM-dd H:mm"}
                        disableClock
                        formatShortWeekday={(locale, value) =>
                            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][value.getDay()]
                        }
                        hourAriaLabel="hour"
                        dayAriaLabel="day"
                    />
                    <Button onClick={this.handleFilterClick}>过滤</Button>
                </div>

                <br />

                <Table columns={this.columns} dataSource={this.state.consumerData} />
            </div>);
    }


}


