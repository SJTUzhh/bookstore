import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {AdminSideBar} from "../components/AdminSideBar";
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import {AdminUserList} from "../components/AdminUserList";
import '../css/home.css'

const { Header, Content, Footer } = Layout;

class AdminUserView extends React.Component{

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
                            <p>用户管理页面</p>
                            <AdminUserList/>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AdminUserView);