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

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderBookRepository orderBookRepository;

    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Order> getOrders(){
        return orderRepository.getOrders();
    }

    public List<OrderBook> getOrderBooks(){
        List<OrderBook> orderBooks = orderBookRepository.findAll();
        //fetch book name
        for(OrderBook orderBook : orderBooks){
            int bookId = orderBook.getBookId();
            String bookname = bookRepository.getOne(bookId).getName();
            orderBook.setBookname(bookname);
        }
        return orderBooks;
    }


}
