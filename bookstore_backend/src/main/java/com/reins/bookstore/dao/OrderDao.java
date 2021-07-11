package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderDao {
    List<Order> getOrders(Long beginTimestamp, Long endTimestamp);
    List<OrderItem> getOrderItems();
}
