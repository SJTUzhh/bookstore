package com.reins.bookstore.repository;

import com.reins.bookstore.entity.OrderBook;
import com.reins.bookstore.entity.compositePK.OrderBookPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderBookRepository extends JpaRepository<OrderBook, OrderBookPK> {
}
