package com.reins.bookstore.repository;

import com.reins.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserAuthRepository extends JpaRepository<UserAuth,String>{

    @Query(value = "from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

    /**
     *
     * @return UserAuth with no "password" and "userType"
     */
    @Query("select new UserAuth(ua.userId, ua.username, ua.enabled) from UserAuth ua")
    List<UserAuth> getUserAuths();
}
