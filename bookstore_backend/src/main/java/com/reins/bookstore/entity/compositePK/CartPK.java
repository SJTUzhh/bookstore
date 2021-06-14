package com.reins.bookstore.entity.compositePK;

import lombok.Data;

import java.io.Serializable;

@Data
public class CartPK implements Serializable {
    private int userId;
    private int bookId;

    public CartPK(){
    }
    public CartPK(int userId, int bookId){
        this.bookId = bookId;
        this.userId = userId;
    }
}
