package com.reins.bookstore.entity.compositePK;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderBookPK implements Serializable {
    private int orderId;
    private int bookId;

    public OrderBookPK(){}

    public OrderBookPK(int orderId, int bookId){
        this.bookId = bookId;
        this.orderId = orderId;
    }

}
