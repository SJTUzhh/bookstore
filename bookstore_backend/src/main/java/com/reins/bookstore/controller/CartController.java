package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartPK;
import com.reins.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


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
        System.out.println(userId);
        System.out.println(bookId);
        return cartService.addBook2Cart(userId, bookId);
    }
}
