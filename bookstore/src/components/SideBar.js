import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import {history} from "../utils/history";


const { SubMenu } = Menu;
const { Sider } = Layout;

export class SideBar extends React.Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        if(collapsed){

        }
        this.setState({ collapsed });
    };

    bookOnClick = () => {
        history.push("/");    
    };

    cartOnClick = () => {
        history.push("/cart");     
    };

    orderOnClick = () => {
        history.push("/order");
    }

    profileOnClick = () => {
        history.push("/profile");
    }

    render() {
        return (
            <div style={{width:this.state.collapsed? "80px":"180px", maxWidth:this.state.collapsed? "80px":"180px", minWidth:this.state.collapsed? "80px":"180px" }}>
            <div className="mySider">
            <Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={this.bookOnClick}>
                        <Icon type="read" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>书籍浏览</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={this.cartOnClick}>
                        <Icon type="shopping-cart" style={{ fontSize: '18px'}} />
                        <span style={{ fontSize: '16px'}}>购物车</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={this.orderOnClick}>
                        <Icon type="solution"  style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>订单信息</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={this.profileOnClick}>
                        <Icon type="user" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>个人信息</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            </div>
            </div>

        );
    }

}