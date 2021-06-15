package com.reins.bookstore.controller;

import com.reins.bookstore.entity.OrderBook;
import com.reins.bookstore.entity.OrderInfo;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrderInfos")
    public List<OrderInfo> getOrderInfos(){
        List<Order> orders = getOrders();
        List<OrderBook> orderBooks = getOrderBooks();



    }

    @RequestMapping("/getOrders")
    public List<Order> getOrders(){
        return orderService.getOrders();
    }

    @RequestMapping("/getOrderBooks")
    public List<OrderBook> getOrderBooks(){
        return orderService.getOrderBooks();
    }
}
