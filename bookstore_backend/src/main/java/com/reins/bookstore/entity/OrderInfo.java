package com.reins.bookstore.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderInfo {
    private int orderId;
    private LocalDateTime datetime;
    private int userId;
    private int bookId;
    private String bookName;
    private int count;

    public OrderInfo() {}
}
