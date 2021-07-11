package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderDao {
    List<Order> getOrders(Long beginTimestamp, Long endTimestamp);

    List<OrderItem> getOrderItems();

    List<OrderItem> getOrderItemsByOrderId(Integer orderId);

    List<OrderItem> getOrderItemsByOrderIds(List<Integer> orderIds);

    List<Order> getOrdersByUserId(Integer userId, Long beginTimestamp, Long endTimestamp);
}
