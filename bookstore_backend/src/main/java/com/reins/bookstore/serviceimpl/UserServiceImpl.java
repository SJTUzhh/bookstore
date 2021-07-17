package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserAuth checkUser(String username, String password){
        return userDao.checkUser(username,password);
    }

    @Override
    public List<UserAuth> getUserAuths(){
        return userDao.getUserAuths();
    }

    @Override
    public Msg changeUserAuthEnabled(Integer userId, Integer enabled) {
        boolean status = userDao.changeUserAuthEnabled(userId, enabled);
        String msg = status ? ((enabled > 0 ? "已解禁" : "已禁用") + " User ID 为 " + userId + " 的用户") : "错误：用户不存在";
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, msg);
    }

    @Override
    public UserAuth checkUsernameExist(String username) {
        return userDao.checkUsernameExist(username);
    }

    @Override
    public Msg addNewUser(String name, String password, String email) {
        userDao.addNewUser(name, password, email);
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "注册成功");
    }

    @Override
    public UserAuth getUserAuthById(Integer userId) {
        return userDao.getUserAuthById(userId);
    }

}
