package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderBook;

import java.util.List;

public interface OrderDao {
    List<Order> getOrders();
    List<OrderBook> getOrderBooks();
}
