import React from 'react';
import { Layout, Tabs } from 'antd'
import { HeaderInfo } from "../components/HeaderInfo";
import { SideBar } from "../components/SideBar";
import { withRouter } from "react-router-dom";
import {OrderTable} from "../components/OrderTable";
import { BuyBookStat } from "../components/BuyBookStat";
import 'antd/dist/antd.css';
import '../css/bookDetail.css'
const { Header, Content, Footer } = Layout;

const { TabPane } = Tabs;

class OrderView extends React.Component {

    constructor(props) {
        super(props);
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
                    <SideBar />
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                                <TabPane tab="历史订单" key="1">
                                    <OrderTable/>
                                </TabPane>
                                <TabPane tab="购书统计" key="2">
                                    <BuyBookStat/>
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

export default withRouter(OrderView);
