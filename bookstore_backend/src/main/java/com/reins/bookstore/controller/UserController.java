package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.User;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @ClassName UserController
 * @Description the controller of user
 * @Author thunderBoy
 * @Date 2019/11/7 13:47
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/checkUser")
    public UserAuth checkUser(@RequestParam("username") String username,@RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUserAuths")
    public List<UserAuth> getUserAuths(@RequestBody Map<String, String> params){
        return userService.getUserAuths();
    }

    @RequestMapping("/getUsers")
    public List<User> getUser(@RequestBody Map<String, String> params){
        return null;
    }

    @RequestMapping("/changeUserAuthEnabled")
    public Msg changeUserAuthEnabled(@RequestParam("userId") Integer userId, @RequestParam("enabled") Integer enabled ){
        return userService.changeUserAuthEnabled(userId, enabled);
    }

    @RequestMapping("/checkUsernameExist")
    public Msg checkUsernameExist(@RequestParam("username") String username){
        UserAuth userAuth = userService.checkUsernameExist(username);
        if(userAuth != null){
            String msg = "用户名已存在！";
            return MsgUtil.makeMsg(MsgUtil.ERROR, msg);
        }else{
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "👌");
        }
    }
}
