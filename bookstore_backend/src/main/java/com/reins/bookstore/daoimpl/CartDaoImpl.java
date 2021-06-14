package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.reins.bookstore.entity.compositePK.CartPK;

import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartPK addBook2Cart(Integer userId, Integer bookId){
        boolean cartExists = cartRepository.existsById(new CartPK(userId.intValue(), bookId.intValue()));
        if(cartExists){
            Cart queryCart = cartRepository.getOne(new CartPK(userId.intValue(), bookId.intValue()));
            queryCart.setCount(queryCart.getCount() + 1);
            cartRepository.save(queryCart);
        } else{
            Cart newCart = new Cart(userId.intValue(), bookId.intValue(), 1);
            cartRepository.save(newCart);
        }
        cartRepository.flush();
        return new CartPK(userId.intValue(), bookId.intValue());
    }

    @Override
    public List<Cart> getCartsByUserId(Integer userId){
        return cartRepository.findDistinctByUserIdIgnoreCase(userId);
    }

}
