package com.reins.bookstore.entity;

import com.reins.bookstore.entity.compositePK.OrderBookPK;
import lombok.Data;
import org.hibernate.annotations.Persister;

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

    @Transient
    private String bookname;
    @Transient
    private Double bookPrice;

    public OrderBook(){}

    public OrderBook(int orderId, int bookId, int count, String bookname, Double bookPrice){
        this.orderId = orderId;
        this.bookId = bookId;
        this.count = count;
        this.bookname = bookname;
        this.bookPrice = bookPrice;
    }
}

