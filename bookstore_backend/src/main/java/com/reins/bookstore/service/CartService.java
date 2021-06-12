package com.reins.bookstore.service;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartPK;

public interface CartService {
    public CartPK addBook2Cart(Integer userId, Integer bookId);
}
