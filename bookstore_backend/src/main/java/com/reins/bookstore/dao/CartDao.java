package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;

import java.util.List;

public interface CartDao {
    CartPK addBook2Cart(Integer userId, Integer bookId);
    List<Cart> getCartsByUserId(Integer userId);
}
