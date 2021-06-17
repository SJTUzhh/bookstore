package com.reins.bookstore.dao;

import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.utils.msgutils.Msg;

import java.util.List;

public interface UserDao {

    UserAuth checkUser(String username, String password);

    List<UserAuth> getUserAuths();

    Msg changeUserAuthEnabled(Integer userId, Integer enabled);

    UserAuth checkUsernameExist(String username);
}
