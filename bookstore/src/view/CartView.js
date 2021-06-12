import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/bookDetail.css'
import {withRouter} from "react-router-dom";

const { Header, Content, Footer } = Layout;

class CartView extends React.Component{

    constructor(props) {
        super(props);

        this.state = {books:null};



    }

    componentDidMount(){
        // let user = localStorage.getItem("user");
        // this.setState({user:user});

        // const query = this.props.location.search;
        // const arr = query.split('&');
        // const bookId = arr[0].substr(4);
        // getBook(bookId, (data) => {this.setState({bookInfo: data})})
    }

    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <p>购物车列表</p>

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