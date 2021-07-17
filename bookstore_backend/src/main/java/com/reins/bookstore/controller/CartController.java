package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;
import com.reins.bookstore.service.CartService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping("/addBook2Cart")
    public Cart addBook2Cart(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId, @RequestParam("addCount") Integer addCount){
        return cartService.addBook2Cart(userId, bookId, addCount);
    }
    @RequestMapping("/getCartByUserId")
    public List<JSONObject> getCartByUserId(@RequestParam("userId") Integer userId){
        return cartService.getCartByUserId(userId);
    }

    @RequestMapping("/deleteBookFromCart")
    public Cart deleteBookFromCart(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId){
        return cartService.deleteBookFromCart(userId, bookId);
    }

    @RequestMapping("/payByCart")
    public List<JSONObject> payByCart(@RequestParam("userId") Integer userId, @RequestParam("bookIds") List<Integer> bookIds){
        return cartService.payByCart(userId, bookIds);
    }
}
