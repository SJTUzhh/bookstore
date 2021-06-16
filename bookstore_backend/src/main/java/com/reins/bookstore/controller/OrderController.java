package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderBook;
import com.reins.bookstore.entity.OrderInfo;
import com.reins.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrderInfos")
    public List<OrderInfo> getOrderInfos(@RequestParam("beginTimestamp") Long beginTimestamp,
                                         @RequestParam("endTimestamp") Long endTimestamp){
        List<Order> orders = getOrders(beginTimestamp, endTimestamp);
        List<OrderBook> orderBooks = getOrderBooks();
        List<OrderInfo> orderInfos = new ArrayList<>();

        // 为了取用效率，建立hashmap
        HashMap<Integer, Order> orderMap = new HashMap<>();
        for (Order order : orders) {
            orderMap.put(order.getId(), order);
        }
        // 构造OrderInfo
        for(OrderBook orderBook : orderBooks){
            int orderId = orderBook.getOrderId();
            Order order = orderMap.get(orderId);
            if(order == null) continue; // 针对过滤的情况
            orderInfos.add(new OrderInfo(order, orderBook));
        }

        return orderInfos;
    }

    @RequestMapping("/getOrders")
    public List<Order> getOrders(Long beginTimestamp, Long endTimestamp){
        return orderService.getOrders(beginTimestamp, endTimestamp);
    }

    @RequestMapping("/getOrderBooks")
    public List<OrderBook> getOrderBooks(){
        return orderService.getOrderBooks();
    }
}
