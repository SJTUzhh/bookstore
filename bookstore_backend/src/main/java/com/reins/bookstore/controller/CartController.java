package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.CartPK;
import com.reins.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class CartController {

    @Autowired
    private CartService cartService;
    /**
     *
     * @param bookId
     * @return bookId
     */
    @RequestMapping("/addBook2Cart")
    public CartPK addBook2Cart(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId){
        System.out.println("addBook2Cart: userId: " + userId);
        System.out.println("addBook2Cart: bookId: " + bookId);
        return cartService.addBook2Cart(userId, bookId);
    }
    @RequestMapping("/getCartsByUserId")
    public List<Cart> getCartsByUserId(@RequestParam("userId") Integer userId){
        System.out.println("getCartsByUserId: " + userId);
        return cartService.getCartsByUserId(userId);
    }
}
