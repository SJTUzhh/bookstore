package com.reins.bookstore.service;

import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.utils.msgutils.Msg;

import java.util.List;


public interface UserService {

    //检查登录时输入的用户名和密码是否正确
    UserAuth checkUser(String username, String password);

    List<UserAuth> getUserAuths();

    Msg changeUserAuthEnabled(Integer userId, Integer enabled);

    UserAuth checkUsernameExist(String username);

    Msg addNewUser(String name, String password, String email);

    UserAuth getUserAuthById(Integer userId);
}
