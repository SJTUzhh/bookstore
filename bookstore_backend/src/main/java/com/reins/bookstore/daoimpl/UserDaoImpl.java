package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.UserDao;
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
//        boolean userAuthExists = userAuthRepository.existsById(userId);
//        if(userAuthExists) {
//        }
        UserAuth userAuth = userAuthRepository.findUserAuthByUserId(userId);
        if(userAuth != null){
            System.out.println(userAuth.toString());
            userAuth.setEnabled(enabled);
            userAuthRepository.save(userAuth);
            userAuthRepository.flush();
            String msg = ((enabled > 0) ? "已解禁" : "已禁用") + " User ID 为 " + userId + " 的用户";
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, msg);
        }
        else return null;
    }
}
