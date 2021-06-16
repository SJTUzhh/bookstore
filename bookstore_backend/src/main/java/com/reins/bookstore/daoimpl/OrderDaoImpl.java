package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderBook;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.repository.OrderBookRepository;
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
    OrderBookRepository orderBookRepository;

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

    public List<OrderBook> getOrderBooks(){
        List<OrderBook> orderBooks = orderBookRepository.findAll();
        //fetch bookname and bookPrice
        for(OrderBook orderBook : orderBooks){
            Book book = bookRepository.getOne(orderBook.getBookId());
            String bookname = book.getName();
            Double bookPrice = book.getPrice();
            orderBook.setBookname(bookname);
            orderBook.setBookPrice(bookPrice);
        }
        return orderBooks;
    }


}
