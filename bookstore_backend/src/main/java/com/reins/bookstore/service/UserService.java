package com.reins.bookstore.service;

import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.utils.msgutils.Msg;

import java.util.List;


public interface UserService {

    UserAuth checkUser(String username, String password);
    List<UserAuth> getUserAuths();
    Msg changeUserAuthEnabled(Integer userId, Integer enabled);
}
