import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import AdminRoute from './AdminRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import BookView from "./view/BookView";
import CartView from "./view/CartView";
import AdminHomeView from "./view/AdminHomeView"
import AdminUserView from "./view/AdminUserView"
import AdminBookView from "./view/AdminBookView"
import AdminOrderView from "./view/AdminOrderView"
import AdminStatView from "./view/AdminStatView"
import {history} from "./utils/history";



class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomeView} />
                    <LoginRoute exact path="/login" component={LoginView} />
                    <PrivateRoute exact path="/bookDetails" component={BookView} />
                    <PrivateRoute exact path="/cart" component={CartView} />

                    <AdminRoute exact path="/admin" component={AdminHomeView} />
                    <AdminRoute exact path="/admin/user" component={AdminUserView} />
                    <AdminRoute exact path="/admin/book" component={AdminBookView} />
                    <AdminRoute exact path="/admin/order" component={AdminOrderView} />
                    <AdminRoute exact path="/admin/stat" component={AdminStatView} />
                    {/* 管理员可以手动输入url访问顾客的页面 */}
                    <Redirect from="/*" to="/" />
                </Switch>

            </Router>
        )
    }


}

export default BasicRoute;