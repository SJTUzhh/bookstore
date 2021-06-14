import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import {getBooks} from "../services/bookService"
//import './index.css';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

export class AdminBookTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Title',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: 'Author',
                dataIndex: 'author',
                editable: true,
            },
            {
                title: 'Cover',
                dataIndex: 'image',
                editable: true,
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                editable: true,
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                editable: true,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    let deleteButton = (this.state.dataSource.length >= 1) ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.bookId)}>
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                    ) : null;
                    return (<span>
                        <Button type="normal" onClick={() => this.rowDetail(record.bookId)}>详情</Button>
                        <Button type="primary" onClick={() => this.rowCommit(record.bookId)}>提交</Button>
                        {deleteButton}
                    </span>)
                }


            },
        ];

        this.state = {
            dataSource: [
                {
                    bookId: '1',
                    name: 'Java核心技术卷II',
                    author: '凯S.霍斯特曼',
                    image: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg",
                    isbn: 1,
                    inventory: 1000,
                },
                {
                    bookId: '2',
                    name: '深入理解计算机系统',
                    author: '兰德尔·E·布莱恩特',
                    image: "http://img3m7.ddimg.cn/48/0/24106647-1_w_6.jpg",
                    isbn: 2,
                    inventory: 1200,
                }
            ],
            count: 2,
        };
    }

    handleDelete = bookId => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.bookId !== bookId) });
        this.rowDelete();
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            bookId: count + 1,
            name: 'xxxxxxx',
            author: 'xxxxxxx',
            image: "xxxxxxx",
            isbn: count + 1,
            inventory: 0,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.bookId === item.bookId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    //operation callback:

    rowDetail = row => {
        message.success("Detail for bookId:" + row);
    }

    rowCommit = row => {
        message.success("Commit for bookId:" + row);
    }

    rowDelete = row => {
        message.success("Delete for bookId:" + row);
    }

    componentDidMount(){

        const callback = (data) => {
            console.log(data);
            this.setState({ dataSource: data , count: data.length});
        };

        getBooks({"search": null}, callback);
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

