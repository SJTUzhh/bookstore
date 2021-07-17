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
    public boolean changeUserAuthEnabled(Integer userId, Integer enabled) {
        UserAuth userAuth = userAuthRepository.findUserAuthByUserId(userId);
        if(userAuth != null){
            userAuth.setEnabled(enabled);
            userAuthRepository.saveAndFlush(userAuth);
            return true;
        }
        return false;
    }

    @Override
    public UserAuth checkUsernameExist(String username) {
        return userAuthRepository.findUserAuthByName(username);
    }

    @Override
    public void addNewUser(String name, String password, String email) {
        UserAuth userAuth = new UserAuth(name, password, 1, 1);
        User user = new User(name, email);
        userAuth.setUser(user);
        user.setUserAuth(userAuth);
        userAuthRepository.saveAndFlush(userAuth);
    }

    @Override
    public UserAuth getUserAuthById(Integer userId) {
        return userAuthRepository.findUserAuthByUserId(userId);
    }
}
