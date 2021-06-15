package com.reins.bookstore.entity;

import com.reins.bookstore.entity.compositePK.OrderBookPK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@IdClass(OrderBookPK.class)
@Table(name = "order_book")
public class OrderBook {
    @Id
    @Column(name="order_id")
    private int orderId;
    @Id
    @Column(name="book_id")
    private int bookId;
    private int count;

    public OrderBook(){}

    public OrderBook(int orderId, int bookId, int count){
        this.orderId = orderId;
        this.bookId = bookId;
        this.count = count;
    }
}

