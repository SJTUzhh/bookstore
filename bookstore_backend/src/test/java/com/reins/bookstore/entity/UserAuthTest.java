package com.reins.bookstore.entity;

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
        UserAuth userAuth = new UserAuth("test", "test", 1, 1);
        User user = new User();

        user.setUserAuth(userAuth);
        userAuth.setUser(user);

        userAuthRepository.saveAndFlush(userAuth);
    }


}