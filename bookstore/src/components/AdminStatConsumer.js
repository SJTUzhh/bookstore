import React from 'react';
import { Table, Button } from 'antd';
import { getOrderInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class AdminStatConsumer extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'User Id',
                dataIndex: 'userId',
                key: 'userId',
                render: text => <a>{text}</a>
            },
            {
                title: 'User Name',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Total Cost',
                dataIndex: 'totalCost',
                key: 'totalCost',
                defaultSortOrder: 'descend',
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

        getOrderInfos({ "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp }, callback);
    }

    getConsumerData = (data) => {
        console.log(data[0], data.length);
        let consumerData = [];
        for (let i = 0; i < data.length; i++) {
            let userId = data[i].userId;
            let existed = false;
            for (let j = 0; j < consumerData.length; j++) {
                if (consumerData[j].userId == userId) {
                    consumerData[j].totalCost += data[i].bookPrice * data[i].count;
                    existed = true;
                    break;
                }
            }
            if (!existed) {
                consumerData.push({
                    userId: data[i].userId,
                    username: "暂不支持查看",
                    totalCost: data[i].bookPrice * data[i].count
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


