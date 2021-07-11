import React from 'react';
import { Table, Button, Layout, Checkbox, Modal, message } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import { getCartByUserId, addBook2Cart, deleteBookFromCart, payByCart } from "../services/cartService";
import 'antd/dist/antd.css';
import '../css/bookDetail.css'

const { ButtonGroup } = Button.Group;
const { Header, Content, Footer } = Layout;

class CartView extends React.Component {

    constructor(props) {
        super(props);
        this.cartColumns = [
            {
                title: '书名',
                dataIndex: 'bookName',
                key: 'bookName',
                render: text => <a>{text}</a>,
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                render: (text) => {
                    return text.toFixed(2)
                }
            },
            {
                title: '数目',
                key: 'count',
                dataIndex: 'count',
                render: (text, record, index) => {
                    return (<span>
                        <Button icon="minus" size="small" onClick={(e) => this.decreaseCount(text, record.bookId, index)}></Button>
                        <Button size="small">{text}</Button>
                        <Button icon="plus" size="small" onClick={(e) => this.increaseCount(text, record.bookId, index)}></Button>
                    </span>)
                }
            },
            {
                title: '选择',
                key: 'select',
                dataIndex: 'select',
                render: (text, record, index) => (<span>
                    <Checkbox onChange={(e) => { this.onCheckboxChange(e, record.bookId) }}></Checkbox>
                </span>)
            },
            {
                title: '删除',
                key: 'delete',
                dataIndex: 'delete',
                render: (text, record, index) => (<span>
                    <Button type="primary" icon="delete" onClick={(e) => this.deleteCartItem(record.bookId)}>删除</Button>
                </span>)
            },
        ];

        this.payResultColumns = [
            {
                title: '书名',
                dataIndex: 'bookName',
                key: 'bookName',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                render: (text) => {
                    return text.toFixed(2)
                }
            },
            {
                title: '数目',
                key: 'count',
                dataIndex: 'count',
            },
            {
                title: '总价',
                key: 'cost',
                dataIndex: 'cost',
                render: (text) => {
                    return text.toFixed(2)
                }
            },
            {
                title: '购买结果',
                key: 'state',
                dataIndex: 'state',
                render: (text) => {
                    if(text == "fail") {
                        return <span>失败</span>
                    } else {//(text == 'success')
                        return <span>成功</span>
                    }
                }
        
            },
            {
                title: '备注',
                key: 'message',
                dataIndex: 'message',
                // render: () => {
                    
                // }
            }
        
        ];

        this.userId = JSON.parse(localStorage.getItem('user')).userId

        this.state = {
            cartInfos: [],
            seletedBooks: [],
            payResult: [],
            payResultVisible: false,
        };
    }

    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        getCartByUserId(userId, (data) => {
            this.setState({ cartInfos: data })
        })
    }

    onCheckboxChange = (e, bookId) => {
        const seletedBooks = this.state.seletedBooks;
        if (e.target.checked) {
            this.setState({
                seletedBooks: [...seletedBooks, bookId]
            });
        } else {
            this.setState({
                seletedBooks: seletedBooks.filter(i => i !== bookId)
            })
        }
    }

    increaseCount = (text, bookId, index) => {
        addBook2Cart(this.userId, bookId, 1, () => {
            getCartByUserId(this.userId, (data) => {
                this.setState({ cartInfos: data })
            })
        })
    }

    decreaseCount = (text, bookId, index) => {
        if (text == '1') return
        addBook2Cart(this.userId, bookId, -1, () => {
            getCartByUserId(this.userId, (data) => {
                this.setState({ cartInfos: data })
            })
        })
    }

    deleteCartItem = (bookId) => {
        deleteBookFromCart(this.userId, bookId, () => {
            getCartByUserId(this.userId, (data) => {
                this.setState({ cartInfos: data })
            })
        })
    }

    paySelected = () => {
        const selectedBooks = this.state.seletedBooks;
        if (selectedBooks.length == 0) {
            message.error("请至少选择一种要结算的书！")
            return
        }
        console.log(selectedBooks);

        payByCart(this.userId, selectedBooks, (data) => {
            this.setState({ payResult: data, payResultVisible: true })
            getCartByUserId(this.userId, (data) => {
                this.setState({ cartInfos: data })
            })
        });
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <Table columns={this.cartColumns} dataSource={this.state.cartInfos} />
                            <Modal
                                title="结算结果"
                                visible={this.state.payResultVisible}
                                onOk={() => {
                                    this.setState({ payResultVisible: false })
                                }}
                            //onCancel={() => { this.setState({ willPayVisible: false, afterPaidVisible: false }) }}
                            >
                                <Table columns={this.payResultColumns} dataSource={this.state.payResult}></Table>

                            </Modal>
                            <Button type="danger" icon="pay-circle" size={"large"} style={{ float: 'right', marginRight: '1%' }}
                                onClick={() => {
                                    this.paySelected()
                                }}>
                                结算
                            </Button>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(CartView);
