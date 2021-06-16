import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {AdminSideBar} from "../components/AdminSideBar";
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {AdminOrderTable} from "../components/AdminOrderTable";

const { Header, Content, Footer } = Layout;

class AdminOrderView extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <AdminSideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            {/* <SearchBar />

                            <BookCarousel />
                            <BookList /> */}
                            <p>订单管理页面</p>
                            <AdminOrderTable/>                        
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AdminOrderView);