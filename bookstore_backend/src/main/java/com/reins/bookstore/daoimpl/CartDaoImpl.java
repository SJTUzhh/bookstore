package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.repository.CartRepository;
import net.sf.json.JSONObject;
import org.omg.CORBA.INTERNAL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.reins.bookstore.entity.compositePK.CartPK;

import javax.print.attribute.standard.JobSheets;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Cart addBook2Cart(Integer userId, Integer bookId, Integer addCount){
        Cart cart;
        boolean exists = cartRepository.existsById(new CartPK(userId, bookId));
        if(exists){
            cart = cartRepository.getOne(new CartPK(userId, bookId));
            cart.setCount(cart.getCount() + addCount);
        } else{
            cart  = new Cart(userId, bookId, addCount);
        }
        cartRepository.saveAndFlush(cart);
        return new Cart(userId, bookId, addCount);
    }

    @Override
    public List<JSONObject> getCartByUserId(Integer userId){
        List<Integer> bookIds = new ArrayList<>();
        List<JSONObject> cartInfos = new ArrayList<>();
        cartRepository.findByUserId(userId).forEach((cart)->{
            JSONObject cartInfo = new JSONObject();
            cartInfo.put("bookId", cart.getBookId());
            cartInfo.put("count", cart.getCount());
            cartInfos.add(cartInfo);
            bookIds.add(cart.getBookId());
        });
        List<Book> booksInCart = bookRepository.findAllById(bookIds);
        if(booksInCart.size() != cartInfos.size()){
            System.out.println("-------------------------------wrong case------------------------------------------");
        }
        for(int i = 0; i < cartInfos.size(); i++){
            cartInfos.get(i).put("bookName", booksInCart.get(i).getName());
            cartInfos.get(i).put("price", booksInCart.get(i).getPrice());
            cartInfos.get(i).put("shelve", booksInCart.get(i).getShelve());
        }
        return cartInfos;
    }

}
