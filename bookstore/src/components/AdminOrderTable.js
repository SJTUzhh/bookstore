import React from 'react';
import { Table, Button } from 'antd';
import { getOrderInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class AdminOrderTable extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Order ID',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: 'Datetime',
                dataIndex: 'datetime',
                key: 'datetime',
                render: text => {
                    return text.replace("T", "  ")
                }
            },
            {
                title: 'User Id',
                dataIndex: 'userId',
                key: 'userId',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Title',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: 'Count',
                dataIndex: 'count',
                key: 'count',
            },

        ];

        this.state = {
            dataSource: [],
            datetimeRange: [new Date(1609488000 * 1000), new Date(1617260400 * 1000)]
        };
    }

    componentDidMount() {

        const callback = (data) => {
            this.setState({ dataSource: data });
        };

        getOrderInfos({ "beginTimestamp": 0.0, "endTimestamp": 0.0}, callback);

    }

    handlePickerChange = (value) => {
        this.setState({ datetimeRange: value });
    }

    handleFilterClick = () => {
        const callback = (data) => {
            this.setState({ dataSource: data });
        }
        const datetimeRange = this.state.datetimeRange;
        const beginTimestamp = datetimeRange == null ? 0.0 : datetimeRange[0].getTime();
        const endTimestamp = datetimeRange == null ? 0.0 : datetimeRange[1].getTime();

        getOrderInfos({ "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp}, callback);
        
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

                <Table columns={this.columns} dataSource={this.state.dataSource} />
            </div>);
    }

}