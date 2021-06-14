package com.reins.bookstore.dao;

import com.reins.bookstore.entity.UserAuth;

import java.util.List;

public interface UserDao {

    UserAuth checkUser(String username, String password);

    List<UserAuth> getUserAuths();
}
