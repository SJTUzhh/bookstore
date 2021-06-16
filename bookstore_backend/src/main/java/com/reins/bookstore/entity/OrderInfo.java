package com.reins.bookstore.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderInfo {
    private int orderId;
    private LocalDateTime datetime;
    private int userId;
    private int bookId;
    private String bookname;
    private int count;

    public OrderInfo() {}

    public OrderInfo(Order order, OrderBook orderBook){
        this.orderId = order.getId();
        this.datetime = order.getDatetime();
        this.userId = order.getUserId();
        this.bookId = orderBook.getBookId();
        this.bookname = orderBook.getBookname();
        this.count = orderBook.getCount();
    }

}
