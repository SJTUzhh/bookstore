package com.reins.bookstore.dao;

import com.reins.bookstore.entity.CartPK;

public interface CartDao {
    CartPK addBook2Cart(Integer userId, Integer bookId);
}
