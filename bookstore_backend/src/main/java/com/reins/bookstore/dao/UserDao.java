package com.reins.bookstore.dao;

import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.utils.msgutils.Msg;

import java.util.List;

public interface UserDao {

    UserAuth checkUser(String username, String password);

    List<UserAuth> getUserAuths();

    boolean changeUserAuthEnabled(Integer userId, Integer enabled);

    UserAuth checkUsernameExist(String username);

    void addNewUser(String name, String password, String email);

    UserAuth getUserAuthById(Integer userId);
}
