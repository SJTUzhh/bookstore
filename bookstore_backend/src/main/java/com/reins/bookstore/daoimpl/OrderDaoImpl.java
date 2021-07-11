package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Order> getOrders(Long beginTimestamp, Long endTimestamp){
        if(beginTimestamp == 0 || endTimestamp == 0){
            // 必须两个都提供，否则不过滤
            return orderRepository.findAll();
        }
        else{
            LocalDateTime begin = LocalDateTime.ofInstant(Instant.ofEpochMilli(beginTimestamp), TimeZone.getDefault().toZoneId());
            LocalDateTime end = LocalDateTime.ofInstant(Instant.ofEpochMilli(endTimestamp), TimeZone.getDefault().toZoneId());
            return orderRepository.findOrdersByDatetimeAfterAndDatetimeBefore(begin, end);
        }
    }

    @Override
    public List<OrderItem> getOrderItems(){
        List<OrderItem> orderItems = orderItemRepository.findAll();
//        //fetch bookname and bookPrice
//        for(OrderItem orderBook : orderBooks){
//            Book book = bookRepository.getOne(orderBook.getBookId());
//            String bookname = book.getName();
//            Double bookPrice = book.getPrice();
//            orderBook.setBookname(bookname);
//            orderBook.setBookPrice(bookPrice);
//        }
        return orderItems;
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Integer orderId) {
        return orderItemRepository.findOrderItemsByOrderId(orderId);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderIds(List<Integer> orderIds){
        return orderItemRepository.findOrderItemsByOrderIds(orderIds);
    }

    @Override
    public List<Order> getOrdersByUserId(Integer userId, Long beginTimestamp, Long endTimestamp) {
        if(beginTimestamp == 0 || endTimestamp == 0){
            // 必须两个都提供，否则不过滤
            return orderRepository.findOrdersByUserId(userId);
        }
        else{
            LocalDateTime begin = LocalDateTime.ofInstant(Instant.ofEpochMilli(beginTimestamp), TimeZone.getDefault().toZoneId());
            LocalDateTime end = LocalDateTime.ofInstant(Instant.ofEpochMilli(endTimestamp), TimeZone.getDefault().toZoneId());
            return orderRepository.findOrdersByUserIdAndDatetimeAfterAndDatetimeBefore(userId, begin, end);
        }
    }
}
