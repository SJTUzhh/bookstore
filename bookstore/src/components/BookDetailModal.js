import React from "react";
import Modal from "react-modal";
import { Descriptions, Button } from "antd";
import "../css/bookDetail.css"


export class BookDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.bookInfo = props.bookInfo;
    }

    showModal = () => {
        this.setState({ isOpen: true });
    }

    closeModal = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const info = this.bookInfo;
        return <div>
            <Button type="normal" onClick={this.showModal}>详情</Button>
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal}
                contentLabel="book detal modal"
                className={"detail-modal"}
                overlayClassName={"detail-overlay"}
            >
                <div className={"book-image"}><img alt="image" src={info.image} style={{width:"350px", height:"350px"}}/></div>

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

                <button onClick={this.closeModal}>Close</button>
            </Modal>
        </div>

    }

}