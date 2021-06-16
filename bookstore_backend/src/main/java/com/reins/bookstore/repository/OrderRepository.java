package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrdersByDatetimeAfterAndDatetimeBefore(LocalDateTime begin, LocalDateTime end);
}
