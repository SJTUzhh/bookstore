package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;
import com.reins.bookstore.service.CartService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public Cart addBook2Cart(Integer userId, Integer bookId, Integer addCount){
        return cartDao.addBook2Cart(userId, bookId, addCount);
    }

    @Override
    public List<JSONObject> getCartByUserId(Integer userId){
        return cartDao.getCartByUserId(userId);
    }

    @Override
    public Cart deleteBookFromCart(Integer userId, Integer bookId) {
        return cartDao.deleteBookFromCart(userId, bookId);
    }

    @Override
    public List<JSONObject> payByCart(Integer userId, List<Integer> bookIds) {
        return cartDao.payByCart(userId, bookIds);
    }
}
