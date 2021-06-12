import React from 'react';
import { Table, Button, Layout } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import { getCartsByUserId } from "../services/cartService";
import { getBook } from "../services/bookService"
import 'antd/dist/antd.css';
import '../css/bookDetail.css'

const { ButtonGroup } = Button.Group;
const { Header, Content, Footer } = Layout;

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'isbn',
        dataIndex: 'isbn',
        key: 'isbn',
        render: text => <a>{text}</a>,
    },

    {
        title: 'bookId',
        dataIndex: 'bookId',
        key: 'bookId',
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'count',
        key: 'count',
        dataIndex: 'count',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <div>
                <ButtonGroup size="middle">
                    <Button type="default" icon="plus-circle"></Button>
                    <Button type="default" icon="minus-circle" size={"small"}></Button>
                    <Button type="danger" icon="pay-circle" size={"small"}>结算</Button>
                </ButtonGroup>
            </div>

        ),
    },
];

class CartView extends React.Component {

    constructor(props) {
        super(props);

        //数据库的设计是一个cart表，所以每个条目就是一个cart，每个cart装一种书
        //一个用户如果将多种书加入了购物车，那么他就有多个cart，也就是{carts}
        //carts:
        // { {user}}
        this.state = { carts: [], showData: null };

    }



    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        //getCartsByUserId(userId, (data) => {this.setState({ carts: data })})
        getCartsByUserId(userId, (data) => {
            this.setState({ carts: data }, function () {
                if (this.state.carts.length != 0) {
                    //TODO:有优化的空间：只request一次获取Book数组
                    for (let i=this.state.carts.length-1; i<this.state.carts.length; i++) {
                        let cart = this.state.carts[i]
                        let bookId = cart.bookId;
                        let bookCount = cart.count;
                        getBook(bookId, (data) => {
                            let name = data.name;
                            let isbn = data.isbn;
                            let price = data.price;
                            let newShowDataItem = {
                                name: name,
                                isbn: isbn,
                                bookId: bookId,
                                price: price,
                                count: bookCount
                            };   
                            this.setState({showData: newShowDataItem})     
                            //showData.push(newShowDataItem);       
                            // this.setState(prevState => ({
                            //     showData: [...prevState.showData, newShowDataItem]}))
                            //this.setState({showData: this.state.showData.concat([newShowDataItem])});                         
                        })
                    }
                }
            })
        })     
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
                            {/* <p>购物车列表</p> */}
                            <Table columns={columns} dataSource={this.state.showData} />
                            <Button type="danger" icon="pay-circle" size={"large"}
                                style={{ float: 'right', marginRight: '1%' }}>
                                全部结算
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