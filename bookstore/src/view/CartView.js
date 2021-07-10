import React from 'react';
import { Table, Button, Layout, Checkbox} from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import { getCartByUserId, addBook2Cart, deleteBookFromCart } from "../services/cartService";
import 'antd/dist/antd.css';
import '../css/bookDetail.css'

const { ButtonGroup } = Button.Group;
const { Header, Content, Footer } = Layout;

class CartView extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'bookName',
                dataIndex: 'bookName',
                key: 'bookName',
                render: text => <a>{text}</a>,
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
                render: (text, record, index) => {
                    return (<span>                        
                        <Button icon="minus" size="small" onClick={(e) => this.decreaseCount(text, record.bookId, index)}></Button>
                        <Button size="small">{text}</Button>
                        <Button icon="plus" size="small" onClick={(e) => this.increaseCount(text, record.bookId, index)}></Button>
                    </span>)
                }
            },
            {
                title: 'select',
                key: 'select',
                dataIndex: 'select',
                render: (text, record, index) => (<span>
                    <Checkbox onChange={(e) => { this.onCheckboxChange(e, index) }}></Checkbox>
                </span>)
            },
            {
                title: 'delete',
                key: 'delete',
                dataIndex: 'delete',
                render: (text, record, index) => (<span>
                    <Button type="primary" icon="delete" onClick={(e) => this.deleteCartItem(record.bookId)}>删除</Button>
                </span>)
            },        
        ];

        this.userId = JSON.parse(localStorage.getItem('user')).userId

        this.state = { cartInfos: [], seletedBooks: [] };
    }

    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        getCartByUserId(userId, (data) => {
            this.setState({ cartInfos: data })
        })
    }

    onCheckboxChange = (e, index) => {
        const seletedBooks = this.state.seletedBooks;
        if (e.target.checked) {
            this.setState({
                seletedBooks: [...seletedBooks, index]
            });
        } else {
            this.setState({
                seletedBooks: seletedBooks.filter(i => i !== index)
            })
        }
    }

    increaseCount = (text, bookId, index) => {
        addBook2Cart(this.userId, bookId, 1, () => {
            // //更新本地{cartInfos}
            // let newCartInfos = this.state.cartInfos
            // newCartInfos[index].count = newCartInfos[index].count + 1;
            // this.setState({
            //     cartInfos: newCartInfos
            // })
            getCartByUserId(this.userId, (data) => {
                this.setState({ cartInfos: data })
            })
        })
    }

    decreaseCount = (text, bookId, index) => {
        if(text == '1') return
        addBook2Cart(this.userId, bookId, -1, () => {
            // //更新本地{cartInfos}
            // let newCartInfos = this.state.cartInfos
            // newCartInfos[index].count = newCartInfos[index].count + 1;
            // this.setState({
            //     cartInfos: newCartInfos
            // })
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

    //TODO: 后续可重构代码，将Table写到一个CartList组件里
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
                            <Table columns={this.columns} dataSource={this.state.cartInfos} />
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
