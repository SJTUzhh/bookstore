package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reins.bookstore.entity.compositePK.CartPK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@IdClass(CartPK.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Cart {

    @Id
    private Integer userId;
    @Id
    private Integer bookId;
    private Integer count;

    public Cart(){}

    public Cart(int userId, int bookId, int count){
        this.bookId = bookId;
        this.userId = userId;
        this.count = count;
    }
}
