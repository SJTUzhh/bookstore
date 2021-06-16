package com.reins.bookstore.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
//表名不能为MySQL的关键字，所以order要加引号
@Table(name = "`order`")
public class Order {
    @Id
    private int id;
    private LocalDateTime datetime;
    private int userId;

    public Order(){}

}
