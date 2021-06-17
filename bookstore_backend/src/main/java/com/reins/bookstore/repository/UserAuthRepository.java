package com.reins.bookstore.repository;

import com.reins.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserAuthRepository extends JpaRepository<UserAuth, Integer>{

    @Query(value = "from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

    /**
     *
     * @return UserAuth(whose "user_type" > 0), with no "password" and "userType" returned
     */
    @Query("select new UserAuth(ua.userId, ua.username, ua.enabled) from UserAuth ua where ua.userType > 0")
    List<UserAuth> getAllCustomers();

    UserAuth findUserAuthByUserId(Integer userId);

    UserAuth findUserAuthByUsername(String username);
}
