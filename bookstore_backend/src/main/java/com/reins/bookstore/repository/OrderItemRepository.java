package com.reins.bookstore.repository;

import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.entity.compositePK.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
    @Query(value = "from OrderItem oi where oi.pk.orderId in :orderIds")
    List<OrderItem> findOrderItemsByOrderIds(@Param("orderIds") List<Integer> orderIds);

    @Query(value = "select oi from OrderItem oi where oi.pk.orderId = :orderId")
    List<OrderItem> findOrderItemsByOrderId(@Param("orderId") Integer orderId);
}
