package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderBook;
import com.reins.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public List<Order> getOrders(){
        return orderDao.getOrders();
    }

    @Override
    public List<OrderBook> getOrderBooks(){
        return orderDao.getOrderBooks();
    }

}
