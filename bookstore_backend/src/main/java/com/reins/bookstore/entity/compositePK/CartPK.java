package com.reins.bookstore.entity.compositePK;

import lombok.Data;

import java.io.Serializable;

@Data
public class CartPK implements Serializable {
    private Integer userId;
    private Integer bookId;

    public CartPK(){}
    public CartPK(int userId, int bookId){
        this.bookId = bookId;
        this.userId = userId;
    }
}
