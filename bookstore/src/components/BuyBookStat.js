import React from 'react';
import { Table, Button } from 'antd';
import { customerGetBoughtBookInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class BuyBookStat extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '书名',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: '数目',
                dataIndex: 'totalCount',
                key: 'totalCount',
            },
            {
                title: '费用',
                dataIndex: 'totalCost',
                key: 'totalCost',
                render: (text) => {
                    return text.toFixed(2)
                }
            },
        ];

        this.userId = JSON.parse(localStorage.getItem('user')).userId;

        this.state = {
            boughtBookInfos: [],
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
            this.setState({ boughtBookInfos: data });
        }
        const datetimeRange = this.state.datetimeRange;
        const beginTimestamp = datetimeRange == null ? 0.0 : datetimeRange[0].getTime();
        const endTimestamp = datetimeRange == null ? 0.0 : datetimeRange[1].getTime();

        customerGetBoughtBookInfos({ "userId": this.userId, "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp}, callback);      
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

                <Table columns={this.columns} dataSource={this.state.boughtBookInfos} />
            </div>);
    }

}