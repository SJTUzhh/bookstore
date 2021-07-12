import React from 'react';
import { Table, Button } from 'antd';
import { adminGetOrderInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class AdminOrderTable extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Order ID',
                dataIndex: 'orderId',
                key: 'orderId',
                sorter: (a, b) => (a.orderId - b.orderId)
            },
            {
                title: '日期',
                dataIndex: 'datetime',
                key: 'datetime',
                render: text => {
                    return text.replace("T", "  ")
                },
                //sorter: (a, b) => (a.datetime > b.datetime)
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                sorter: (a, b) => (a.username > b.username)
            },
            {
                title: '书名',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: '数目',
                dataIndex: 'count',
                key: 'count',
            },

        ];

        this.state = {
            orderInfos: [],
            datetimeRange: [new Date(1609488000 * 1000), new Date()]
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
            this.setState({ orderInfos: data });
        }
        const datetimeRange = this.state.datetimeRange;
        const beginTimestamp = datetimeRange == null ? 0.0 : datetimeRange[0].getTime();
        const endTimestamp = datetimeRange == null ? 0.0 : datetimeRange[1].getTime();

        adminGetOrderInfos({ "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp}, callback);      
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

                <Table columns={this.columns} dataSource={this.state.orderInfos} />
            </div>);
    }

}