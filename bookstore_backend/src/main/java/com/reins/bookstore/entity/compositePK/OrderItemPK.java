package com.reins.bookstore.entity.compositePK;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class OrderItemPK implements Serializable{
    private int orderId;
    private int bookId;
    public OrderItemPK(){}
    public OrderItemPK(int bookId){
        this.bookId = bookId;
    }
}

