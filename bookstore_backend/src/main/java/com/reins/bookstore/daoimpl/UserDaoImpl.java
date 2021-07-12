package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @ClassName UserDaoImpl
 * @Description the implement of user dao
 * @Author thunderBoy
 * @Date 2019/11/7 13:19
 */
@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserAuth checkUser(String username, String password){
        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public List<UserAuth> getUserAuths() {
        return userAuthRepository.getAllCustomers();
    }

    @Override
    public Msg changeUserAuthEnabled(Integer userId, Integer enabled) {
        UserAuth userAuth = userAuthRepository.findUserAuthByUserId(userId);
        if(userAuth != null){
            userAuth.setEnabled(enabled);
            userAuthRepository.save(userAuth);
            userAuthRepository.flush();
            String msg = ((enabled > 0) ? "已解禁" : "已禁用") + " User ID 为 " + userId + " 的用户";
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, msg);
        }
        else return null;
    }

    @Override
    public UserAuth checkUsernameExist(String username) {
        return userAuthRepository.findUserAuthByName(username);
    }

    @Override
    public Msg addNewUser(String name, String password, String email) {
        UserAuth userAuth = new UserAuth(name, password, 1, 1);
        User user = new User(name, email);

        userAuth.setUser(user);
        user.setUserAuth(userAuth);

        userAuthRepository.saveAndFlush(userAuth);
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "注册成功");
    }

    @Override
    public UserAuth getUserAuthById(Integer userId) {
        return userAuthRepository.findUserAuthByUserId(userId);
    }
}
