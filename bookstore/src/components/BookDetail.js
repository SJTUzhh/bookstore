import React from 'react';
import { Descriptions, Button } from 'antd';
import {addBook2Cart} from "../services/cartService"
import {message} from 'antd';





export class BookDetail extends React.Component{

    constructor(props){
        super(props);
        //this.addToCart = this.addToCart.bind(this);
        //this.checkAddResult = this.checkAddResult.bind(this);
    }
    
    //TODO: 需要检查传回的userId和bookId是否和我们传过去的相等
    checkAddResult(data) {
        if(data != null) {
            message.success("添加购物车成功！");
        }
        else{
            message.error("添加购物车失败！");
        }
    }

    add2Cart(userId, bookId) {
        console.log("Adding "+ bookId + " to "+ userId + "'s Cart");
        addBook2Cart(userId, bookId, this.checkAddResult)

    }

    render() {

        const {info} = this.props;
        const userId = JSON.parse(localStorage.getItem('user')).userId
 
        if(info == null){
            return null;
        }

        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}><img alt="image" src={info.image} style={{width:"350px", height:"350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Button type="danger" icon="shopping-cart" size={"large"} onClick={this.add2Cart.bind(this, userId, info.bookId)}>
                        加入购物车
                    </Button>

                    <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"15%"}}ghost>
                        立即购买
                    </Button>
                </div>
            </div>


        )

    }

}
