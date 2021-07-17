package com.reins.bookstore.entity;

import com.reins.bookstore.entity.compositePK.OrderItemPK;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "`order`") //必须加上这句，否则会建表的sql语句含有关键字order，运行错误
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDateTime datetime;
    private Integer userId;

    //不加cascade的话默认是none，不做任何级联操作
    @OneToMany(fetch = FetchType.LAZY, mappedBy="order", cascade = {CascadeType.ALL})
    private List<OrderItem> orderItems;

    public Order(){
        this.orderItems = new ArrayList<>();
    }

    public Order(LocalDateTime datetime, Integer userId){
        this.datetime = datetime;
        this.userId = userId;
        this.orderItems = new ArrayList<>();
    }

}
