package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;
import net.sf.json.JSONObject;

import java.util.List;

public interface CartDao {
    Cart addBook2Cart(Integer userId, Integer bookId, Integer addCount);

    List<JSONObject> getCartByUserId(Integer userId);

    Cart deleteBookFromCart(Integer userId, Integer bookId);
}
