package com.reins.bookstore.service;

import com.reins.bookstore.entity.UserAuth;

import java.util.List;


public interface UserService {

    UserAuth checkUser(String username, String password);
    List<UserAuth> getUserAuths();
}
