import React from 'react';
import { Table, Button, Layout } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import { getCartByUserId } from "../services/cartService";
import 'antd/dist/antd.css';
import '../css/bookDetail.css'

const { ButtonGroup } = Button.Group;
const { Header, Content, Footer } = Layout;

//TODO: 可重构代码，将const都写入一个const文件里去
const columns = [
    {
        title: '书名',
        dataIndex: 'bookName',
        key: 'bookName',
        render: text => <a>{text}</a>,
    },
    // {
    //     title: 'bookId',
    //     dataIndex: 'bookId',
    //     key: 'bookId',
    // },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '数量',
        key: 'count',
        dataIndex: 'count',
    },
    {
        title: '是否上架',
        key: 'shelve',
        dataIndex: 'shelve',
    },
    {
        title: '操作',
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


const dataSource = [
    {
        bookId: 1, 
        count: 23, 
        bookName: "Java核心技术卷II", 
        price: 95.2, 
        shelve: true
    },
    {
        bookId: 1, 
        count: 23, 
        bookName: "Java核心技术卷II", 
        price: 95.2, 
        shelve: true
    },
    {
        bookId: 1, 
        count: 23, 
        bookName: "Java核心技术卷II", 
        price: 95.2, 
        shelve: true
    },
];

class CartView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cartInfos: []};
    }
    
    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        getCartByUserId(userId, (data) => {
            this.setState({ cartInfos: data })
        })     
    }

    //TODO: 后续可重构代码，将Table写到一个CartList组件里
    render() {
        console.log(this.state.cartInfos)
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
                            <Table columns={columns} dataSource={dataSource} />
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


// if (this.state.carts.length != 0) {
//     //TODO:有优化的空间：只request一次获取Book数组
//     for (let i=this.state.carts.length-1; i<this.state.carts.length; i++) {
//         let cart = this.state.carts[i]
//         let bookId = cart.bookId;
//         let bookCount = cart.count;
//         getBook(bookId, (data) => {
//             let name = data.name;
//             let isbn = data.isbn;
//             let price = data.price;
//             let newShowDataItem = {
//                 name: name,
//                 isbn: isbn,
//                 bookId: bookId,
//                 price: price,
//                 count: bookCount
//             };   
//             this.setState({showData: newShowDataItem})     
//             //showData.push(newShowDataItem);       
//             // this.setState(prevState => ({
//             //     showData: [...prevState.showData, newShowDataItem]}))
//             //this.setState({showData: this.state.showData.concat([newShowDataItem])});                         
//         })
//     }
// }