import React from 'react';
import { List, Input, Button, Icon } from 'antd'
import { Book } from './Book'
import { getBooks } from "../services/bookService";
const { Search } = Input;

export class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { books: []};
    }

    componentDidMount() {

        // const callback = (data) => {
        //     this.setState({ books: data });
        // };

        // getBooks({ "search": null }, callback);
        this.onSearch("");

    }

    onSearch = (value) => {
        const callback = (data) => {
            this.setState({ books: data });
        };

        getBooks({ "searchName": value }, callback);
    }

    render() {
        return (
            <div>
                <div className="global-search-wrapper" style={{ width: 300 }}>
                    <Search placeholder="请输入书名" onSearch={this.onSearch} style={{ width: 700 }} allowClear enterButton size="large" />
                </div>

                <List
                    grid={{ gutter: 10, column: 4 }}
                    dataSource={this.state.books}
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 16,
                    }}

                    renderItem={item => (
                        <List.Item>
                            <Book info={item} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}