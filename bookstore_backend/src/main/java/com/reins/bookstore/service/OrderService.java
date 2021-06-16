package com.reins.bookstore.service;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderBook;

import java.util.List;

public interface OrderService {
    List<Order> getOrders();
    List<OrderBook> getOrderBooks();
}