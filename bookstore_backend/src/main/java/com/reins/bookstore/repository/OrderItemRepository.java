package com.reins.bookstore.repository;

import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.entity.compositePK.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
