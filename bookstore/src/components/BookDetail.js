import React from 'react';
import { Descriptions, Button, Modal } from 'antd';
import { addBook2Cart } from "../services/cartService"
import { message } from 'antd';

export class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { modalVisible: false, addCount: 1 }
    }

    increase() {
        this.setState({ addCount: this.state.addCount + 1 });
    }

    decrease() {
        this.setState({addCount: (this.state.addCount <= 1) ? 1 : (this.state.addCount - 1)});
    }

    openModal() {
        this.setState({ modalVisible: true })
    }

    closeModal() {
        this.setState({ modalVisible: false })
    }

    add2Cart(userId, bookId, addCount) {
        console.log("Adding " + bookId + " to " + userId + "'s Cart: " + addCount);
        addBook2Cart(userId, bookId, addCount, this.checkAddResult)
        this.setState({modalVisible: false, addCount: 1})
    }

    //TODO: 需要检查传回的userId和bookId是否和我们传过去的相等
    checkAddResult(data) {
        if (data != null) {
            message.success("添加购物车成功: 该书已添加" + data.count + "本");
        }else {
            message.error("添加购物车失败！");
        }
    }

    render() {

        const { info } = this.props;
        const userId = JSON.parse(localStorage.getItem('user')).userId

        if (info == null) {
            return null;
        }

        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}><img alt="image" src={info.image} style={{ width: "350px", height: "350px" }} /></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0 ? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Button type="danger" icon="shopping-cart" size={"large"} onClick={this.openModal.bind(this)}>
                        加入购物车
                    </Button>

                    <Modal
                        title="添加到购物车"
                        visible={this.state.modalVisible}
                        onOk={() => {
                            this.add2Cart(userId, info.bookId, this.state.addCount)
                        }}
                        onCancel={this.closeModal.bind(this)}
                    >
                        <div>
                            <div>添加数量</div>                        
                            <input type="button" value='-' onClick={this.decrease.bind(this)} />
                            <input type="button" value={this.state.addCount} />
                            <input type="button" value='+' onClick={this.increase.bind(this)} />
                        </div>
                    </Modal>

                    <Button type="danger" icon="pay-circle" size={"large"} style={{ marginLeft: "15%" }} ghost>
                        立即购买
                    </Button>
                </div>
            </div>
        )

    }

}
