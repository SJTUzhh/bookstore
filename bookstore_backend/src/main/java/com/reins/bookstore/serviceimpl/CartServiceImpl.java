package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;
import com.reins.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public CartPK addBook2Cart(Integer userId, Integer bookId){
        return cartDao.addBook2Cart(userId, bookId);
    }

    @Override
    public List<Cart> getCartsByUserId(Integer userId){
        return cartDao.getCartsByUserId(userId);
    }
}
