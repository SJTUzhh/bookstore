import React from 'react';
import { Layout, Tabs } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { AdminStatBookSell } from "../components/AdminStatBookSell";
import { AdminStatConsumer } from "../components/AdminStatConsumer";
import { AdminSideBar } from "../components/AdminSideBar";
import { withRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import '../css/home.css'

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

class AdminStatView extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({ user: user });
    }

    onTabChange = (key) => {
        //console.log(key);
    }
      

    render() {
        return (
            <Layout className="layout">

                <Header>
                    <HeaderInfo />
                </Header>
                <Layout>
                    <AdminSideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <p>统计信息页面</p>
                            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                                <TabPane tab="热销榜" key="1">
                                    <AdminStatBookSell />
                                </TabPane>
                                <TabPane tab="消费榜" key="2">
                                    <AdminStatConsumer/>
                                </TabPane>
                            </Tabs>
                            <div className={"foot-wrapper"}>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AdminStatView);