package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @RequestMapping("/adminGetOrderInfos")
    public List<JSONObject> adminGetOrderInfos(@RequestParam("beginTimestamp") Long beginTimestamp,
                                         @RequestParam("endTimestamp") Long endTimestamp){
        List<JSONObject> adminOrderInfos = new ArrayList<>();
        List<Order> adminOrders = orderService.getOrders(beginTimestamp, endTimestamp);
        for(Order adminOrder: adminOrders){
            Integer orderId = adminOrder.getId();
            Integer userId = adminOrder.getUserId();
            String username = userService.getUserAuthById(userId).getName();
            List<OrderItem> orderItems = orderService.getOrderItemsByOrderId(orderId);
            for(OrderItem orderItem: orderItems){
                JSONObject adminOrderInfo = new JSONObject();
                adminOrderInfo.put("orderId", orderId);
                adminOrderInfo.put("bookId", orderItem.getPk().getBookId());
                adminOrderInfo.put("datetime", adminOrder.getDatetime().toString());
                adminOrderInfo.put("userId", userId);
                adminOrderInfo.put("username", username);
                adminOrderInfo.put("bookname", orderItem.getBookname());
                adminOrderInfo.put("count", orderItem.getCount());
                adminOrderInfo.put("cost", orderItem.getCost());
                adminOrderInfos.add(adminOrderInfo);
            }
        }
        return adminOrderInfos;
    }

    @RequestMapping("/customerGetOrderInfos")
    public List<JSONObject> customerGetOrderInfos(@RequestParam("beginTimestamp") Long beginTimestamp,
                                                  @RequestParam("endTimestamp") Long endTimestamp,
                                                  @RequestParam("userId") Integer userId){
        List<JSONObject> customerOrderInfos = new ArrayList<>();
        List<Order> customerOrders = orderService.getOrdersByUserId(userId, beginTimestamp, endTimestamp);
        for(Order customerOrder: customerOrders){
            Integer orderId = customerOrder.getId();
            List<OrderItem> orderItems = orderService.getOrderItemsByOrderId(orderId);
            for(OrderItem orderItem: orderItems){
                JSONObject customerOrderInfo = new JSONObject();
                customerOrderInfo.put("bookId", orderItem.getPk().getBookId());
                customerOrderInfo.put("datetime", customerOrder.getDatetime().toString());
                customerOrderInfo.put("bookname", orderItem.getBookname());
                customerOrderInfo.put("count", orderItem.getCount());
                customerOrderInfo.put("cost", orderItem.getCost());
                customerOrderInfos.add(customerOrderInfo);
            }
        }
        return customerOrderInfos;
    }

    @RequestMapping("/customerGetBoughtBookInfos")
    public List<JSONObject> customerGetBoughtBookInfos(@RequestParam("beginTimestamp") Long beginTimestamp,
                                                  @RequestParam("endTimestamp") Long endTimestamp,
                                                  @RequestParam("userId") Integer userId){
        List<JSONObject> boughtBookInfos = new ArrayList<>();
        List<Integer> orderIds = new ArrayList<>();
        orderService.getOrdersByUserId(userId, beginTimestamp, endTimestamp)
                .forEach((customerOrder) -> {
                    orderIds.add(customerOrder.getId());
                });
        List<OrderItem> orderItems = orderService.getOrderItemsByOrderIds(orderIds);
        Set<Integer> bookIds = new HashSet<>();
        int totalCountSum = 0;
        double totalCostSum = 0.0;
        for(int i = 0; i < orderItems.size(); i++){
            OrderItem orderItem = orderItems.get(i);
            int totalCount = 0;
            double totalCost = 0.0;
            Integer bookId = orderItem.getPk().getBookId();
            if(bookIds.contains(bookId)) {continue;}
            else {bookIds.add(bookId);}
            for(int j = i; j < orderItems.size(); j++){
                OrderItem _orderItem = orderItems.get(j);
                Integer _bookId = _orderItem.getPk().getBookId();
                if(bookId.equals(_bookId)){
                    totalCount += _orderItem.getCount();
                    totalCost += _orderItem.getCost();
                    totalCountSum += _orderItem.getCount();
                    totalCostSum += _orderItem.getCost();
                }
            }
            JSONObject boughtBookInfo = new JSONObject();
            boughtBookInfo.put("bookname", orderItem.getBookname());
            boughtBookInfo.put("totalCount", totalCount);
            boughtBookInfo.put("totalCost", totalCost);
            boughtBookInfos.add(boughtBookInfo);
        }
        JSONObject boughtBookSum = new JSONObject();
        boughtBookSum.put("bookname", "??????");
        boughtBookSum.put("totalCount", totalCountSum);
        boughtBookSum.put("totalCost", totalCostSum);
        boughtBookInfos.add(0, boughtBookSum);
        return boughtBookInfos;
    }

    @RequestMapping("/getOrders")
    public List<Order> getOrders(Long beginTimestamp, Long endTimestamp){
        return orderService.getOrders(beginTimestamp, endTimestamp);
    }

}
