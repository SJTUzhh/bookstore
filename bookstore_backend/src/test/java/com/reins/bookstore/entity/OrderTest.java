package com.reins.bookstore.entity;

import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

import static javafx.scene.input.KeyCode.L;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderTest {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Test
    public void checkOrderGenerate(){
        Order order1 =  new Order(LocalDateTime.now(), 2 );
        OrderItem orderItem1 = new OrderItem(1, "书1", 2, 200.0);
        OrderItem orderItem2 = new OrderItem(2, "书2", 2, 200.0);
        OrderItem orderItem3 = new OrderItem(3, "书3", 2, 200.0);
        OrderItem orderItem4 = new OrderItem(4, "书4", 2, 200.0);

        order1.getOrderItems().add(orderItem1);
        order1.getOrderItems().add(orderItem2);
        order1.getOrderItems().add(orderItem3);
        order1.getOrderItems().add(orderItem4);
        orderItem1.setOrder(order1);
        orderItem2.setOrder(order1);
        orderItem3.setOrder(order1);
        orderItem4.setOrder(order1);

        Order order2 =  new Order(LocalDateTime.now(), 2 );
        OrderItem orderItem5 = new OrderItem(1, "书1", 2, 200.0);
        OrderItem orderItem6 = new OrderItem(2, "书2", 2, 200.0);

        order2.getOrderItems().add(orderItem5);
        order2.getOrderItems().add(orderItem6);
        orderItem5.setOrder(order2);
        orderItem6.setOrder(order2);

        //会级联保存关联的所有orderItem，并且orderItem的orderId为Order的id
        orderRepository.saveAndFlush(order1);
        orderRepository.saveAndFlush(order2);

    }


}