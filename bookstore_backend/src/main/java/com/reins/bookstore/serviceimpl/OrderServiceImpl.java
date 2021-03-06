package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public List<Order> getOrders(Long beginTimestamp, Long endTimestamp){
        return orderDao.getOrders(beginTimestamp, endTimestamp);
    }

    @Override
    public List<Order> getOrdersByUserId(Integer userId, Long beginTimestamp, Long endTimestamp) {
        return orderDao.getOrdersByUserId(userId, beginTimestamp, endTimestamp);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Integer orderId) {
        return orderDao.getOrderItemsByOrderId(orderId);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderIds(List<Integer> orderIds) {
        return orderDao.getOrderItemsByOrderIds(orderIds);
    }


}
