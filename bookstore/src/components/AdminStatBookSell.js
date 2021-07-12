import React from 'react';
import { Table, Button } from 'antd';
import { adminGetOrderInfos } from '../services/orderService';
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export class AdminStatBookSell extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '书 Id',
                dataIndex: 'bookId',
                key: 'bookId',
            },
            {
                title: '书名',
                dataIndex: 'bookname',
                key: 'bookname',
                render: text => <a>{text}</a>
            },
            {
                title: '总销量',
                dataIndex: 'count',
                key: 'count',
                defaultSortOrder: 'descend',
                sorter: (a, b) => (a.count - b.count)
            },
        ];

        this.state = {
            datetimeRange: [new Date(1609488000 * 1000), new Date()],
            bookSellData: []
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
            this.getBookSellData(data);
        }
        const datetimeRange = this.state.datetimeRange;
        const beginTimestamp = datetimeRange == null ? 0.0 : datetimeRange[0].getTime();
        const endTimestamp = datetimeRange == null ? 0.0 : datetimeRange[1].getTime();

        adminGetOrderInfos({ "beginTimestamp": beginTimestamp, "endTimestamp": endTimestamp }, callback);
    }

    getBookSellData = (data) => {
        console.log(data[0], data.length);
        let bookSellData = [];
        for (let i = 0; i < data.length; i++) {
            let bookId = data[i].bookId;
            let existed = false;
            for (let j = 0; j < bookSellData.length; j++) {
                if (bookSellData[j].bookId == bookId) {
                    bookSellData[j].count += data[i].count;
                    existed = true;
                    break;
                }
            }
            if (!existed) {
                bookSellData.push({
                    bookId: data[i].bookId,
                    bookname: data[i].bookname,
                    count: data[i].count
                })
            }
        }
        this.setState({ bookSellData: bookSellData });
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

                <Table columns={this.columns} dataSource={this.state.bookSellData} />
            </div>);
    }

}