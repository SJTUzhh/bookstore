import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import { getBook, adminGetBooks, commitBook, deleteBook, addBook, changeBookShelve } from "../services/bookService"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { BookDetailModal } from './BookDetailModal';
import Switch from '@material-ui/core/Switch'

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

//??????????????????????????????????????????????????????state????????????????????????construct???props???????????????????????????props?????????
class CustomSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked};
        this.handleChange = this.handleChange.bind(this);
        this.bookId = this.props.bookId;
    }

    handleChange(checked) {
        this.setState({ checked: checked});
        let data = {bookId: this.bookId, shelve: (checked?true:false)}
        const callback = (retData) => {
            if(retData != null && retData == checked){
                let msg = retData ? "?????????" : "?????????";
                message.success(msg + ", bookId???: "+ data.bookId);
            }
        }
        changeBookShelve(data, callback);
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


export class AdminBookTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'bookId',
                key: 'bookId',
                editable: false,
            },
            {
                title: '??????',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'author',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'image',
                editable: true,
                render: (text, record) => {
                    return <span>
                        {text}
                        <a href={text}>   ??????</a>
                    </span>
                }
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'inventory',
                editable: true,
            },
            {
                title: '????????????',
                dataIndex: 'shelve',
                key: 'shelve',
                editable: false,
                render: (text, record) => {
                    //console.log(record.bookId)
                    return <CustomSwitch  
                        checked={record.shelve?true:false}
                        bookId={record.bookId}
                    />
                }
            },
            {
                title: '??????',
                dataIndex: 'operation',
                render: (text, record) => {
                    let deleteButton = (this.state.dataSource.length >= 1) ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.bookId)}>
                            <Button type="danger">??????</Button>
                        </Popconfirm>
                    ) : null;
                    return (<span>
                        <BookDetailModal bookInfo={record}></BookDetailModal>
                        <Button type="primary" onClick={() => this.rowCommit(record)}>??????</Button>
                        
                        {deleteButton}
                    </span>)
                }


            },
        ];

        this.state = {
            dataSource: [],
            filteredData: []
        };
    }

    //??????+?????????
    //??????Add??????????????????????????????
    handleAdd = () => {
        const dataSource = this.state.dataSource;
        const callback = (newBookData) => {
            this.setState({
                dataSource: [...dataSource, newBookData],
                filteredData: [...dataSource, newBookData]
            });
            message.success("???????????????(bookId: " + newBookData.bookId + ")");
        }
        addBook(callback);  
    };

    //??????
    handleSave = row => {
        //dataSource
        let newData = [...this.state.dataSource];
        let index = newData.findIndex(item => row.bookId === item.bookId);
        let item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });

        //filteredData
        newData = [...this.state.filteredData];
        index = newData.findIndex(item => row.bookId === item.bookId);
        item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ filteredData: newData });

    };

    //??????+?????????
    handleDelete = bookId => {
        const dataSource = [...this.state.dataSource];
        const filteredData = [...this.state.filteredData];
        this.setState({
            dataSource: dataSource.filter(item => item.bookId !== bookId),
            filteredData: filteredData.filter(item => item.bookId !== bookId)
        });
        this.rowDelete(bookId);
    };

    //????????????"???????????????
    rowCommit = data => {
        //console.log(data);
        let bookId = data.bookId;

        //check validation
        //type validation should be carried by the table
        if (data.inventory < 0) {
            message.error("???????????????inventory????????????0??? bookId???" + bookId);
        }

        //commit
        const callback = (data) => {
            if (data != null && data.status >= 0) {
                message.success(data.msg);
            }
            else {
                message.error("??????????????????");
            }
        }
        commitBook(data, callback);
    }

    //????????????????????????
    rowDelete = bookId => {
        const callback = (data) => {
            if (data != null && data.status >= 0) {
                message.success(data.msg);
            }
            else {
                message.error("??????????????????");
            }
        }
        deleteBook(bookId, callback);
    }

    componentDidMount() {

        const callback = (data) => {
            //console.log(data);
            this.setState({ dataSource: data, filteredData: data });
        };

        adminGetBooks({ "search": null }, callback);
    }

    handleSearch = selectedOption => {
        if (selectedOption != null) {
            const bookId = selectedOption.bookId;
            for(let i = 0; i < this.state.dataSource.length; i++){
                let book = this.state.dataSource[i]
                if(book.bookId == bookId){
                    this.setState({filteredData: [book]})
                    break;
                }
            }
        } else {
            this.setState({filteredData: this.state.dataSource})
        }
    }

    render() {
        const { filteredData } = this.state;
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
                <Autocomplete
                    id="admin-book-search"
                    options={this.state.dataSource}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, selectedOption) => this.handleSearch(selectedOption)}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="???????????????" variant="outlined" />}
                />
                <br></br>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    ????????????
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={filteredData}
                    columns={columns}
                />
            </div>
        );
    }
}

