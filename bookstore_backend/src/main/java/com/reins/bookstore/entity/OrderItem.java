package com.reins.bookstore.entity;

import com.reins.bookstore.entity.compositePK.OrderItemPK;
import lombok.Data;
import org.hibernate.annotations.Persister;

import javax.persistence.*;


@Data
@Entity
public class OrderItem {
    @EmbeddedId
    private OrderItemPK pk;
    private String bookname;
    private Integer count;
    private Double cost;

    @MapsId("orderId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Order order;

    public OrderItem(){}

    public OrderItem(int bookId, String bookname, int count, Double cost){
        this.setPk(new OrderItemPK(bookId));
        this.bookname = bookname;
        this.count = count;
        this.cost = cost;
    }
}

