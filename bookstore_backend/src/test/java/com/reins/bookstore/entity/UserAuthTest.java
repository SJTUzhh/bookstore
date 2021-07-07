package com.reins.bookstore.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reins.bookstore.repository.UserAuthRepository;
import com.reins.bookstore.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserAuthTest {
    @Autowired
    private UserAuthRepository userAuthRepository;

    @Test
    public void checkUserAuthAdd(){
        UserAuth userAuth = new UserAuth("zhanghong", "zhanghong", 0, 1);
        User user = new User();

        user.setUserAuth(userAuth);
        userAuth.setUser(user);

        userAuthRepository.saveAndFlush(userAuth);
    }

    @Test
    public void checkUserAuth2JsonObject() throws JsonProcessingException {
        UserAuth userAuth = new UserAuth("zhanghong", "zhanghong", 0, 1);
        User user = new User();
        user.setUserAuth(userAuth);
        userAuth.setUser(user);

        String result = new ObjectMapper().writeValueAsString(user);
        System.out.println(result);
    }


}