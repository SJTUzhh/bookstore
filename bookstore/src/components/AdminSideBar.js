import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import {history} from "../utils/history";


const { SubMenu } = Menu;
const { Sider } = Layout;

export class AdminSideBar extends React.Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        if(collapsed){

        }
        this.setState({ collapsed });
    };

    //TODO: 先暂时这样写，后续重构代码
    //参考：https://stackoverflow.com/questions/51274125/setstate-from-a-react-material-ui-menuitem-click-event
    homeOnClick = () => {
        history.push("/admin");    
    };

    userOnClick = () => {
        history.push("/admin/user");    
    };

    bookOnClick = () => {
        history.push("/admin/book");     
    };

    orderOnClick = () => {
        history.push("/admin/order");     
    };

    statOnClick = () => {
        history.push("/admin/stat");     
    };

    render() {
        return (
            <div style={{width:this.state.collapsed? "80px":"180px", maxWidth:this.state.collapsed? "80px":"180px", minWidth:this.state.collapsed? "80px":"180px" }}>
            <div className="mySider">
            <Sider collapsible collapsed={this.state.collapsed} width="180px" onCollapse={this.onCollapse} className="sider" style={{ background: '#fff'}}>
                <Menu defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={this.homeOnClick}>
                        <Icon type="home" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>主页</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={this.userOnClick}>
                        <Icon type="user" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={this.bookOnClick}>
                        <Icon type="book" style={{ fontSize: '18px'}} />
                        <span style={{ fontSize: '16px'}}>书籍管理</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={this.orderOnClick}>
                        <Icon type="form"  style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>订单管理</span>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={this.statOnClick}>
                        <Icon type="line-chart" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>信息统计</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            </div>
            </div>

        );
    }

}