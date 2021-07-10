package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.compositePK.CartPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, CartPK> {
    @Query("select c from Cart c where c.userId = ?1")
    List<Cart> findByUserId(Integer userId);
}
