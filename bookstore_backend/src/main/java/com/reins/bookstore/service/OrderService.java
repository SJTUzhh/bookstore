package com.reins.bookstore.service;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderService {
    List<Order> getOrders(Long beginTimestamp, Long endTimestamp);
    List<OrderItem> getOrderItems();
}
