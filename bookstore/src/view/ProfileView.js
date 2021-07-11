import React from 'react';
import { Layout, Tabs } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import '../css/bookDetail.css'
const { Header, Content, Footer } = Layout;

class ProfileView extends React.Component {

    constructor(props) {
        super(props);
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
                            <div>Profile</div>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(ProfileView);
