package com.reins.bookstore.service;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.CartPK;

import java.util.List;

public interface CartService {
    CartPK addBook2Cart(Integer userId, Integer bookId);
    List<Cart> getCartsByUserId(Integer userId);
}
