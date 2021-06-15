package com.reins.bookstore.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.reins.bookstore.entity.compositePK.CartPK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@IdClass(CartPK.class)
@Table(name = "cart")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Cart {

    @Id
    @Column(name = "user_id")
    private int userId;
    @Id
    @Column(name = "book_id")
    private int bookId;
    private int count;

    public Cart(){}

    public Cart(int userId, int bookId, int count){
        this.bookId = bookId;
        this.userId = userId;
        this.count = count;
    }
}
