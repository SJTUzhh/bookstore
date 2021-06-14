package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

/**
 * @ClassName UserAuth
 * @Description Entity of UserAuth
 * @Author thunderBoy
 * @Date 2019/11/7 13:07
 */

@Entity
@Table(name = "user_auth")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "userId")
public class UserAuth {

    @Id
    private Integer userId;
    private String username;

    // 新加的字段要写getter和setter或者在类前面注解一个@Data，不然不会和数据库的字段关联起来
    //@Transient
    private String password;

    private Integer userType;

    private Integer enabled;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public UserAuth(){}

    public UserAuth(Integer userId, String username, Integer enabled){
        this.userId = userId;
        this.username = username;
        this.enabled = enabled;
    }

    public String toString(){
        return "UserAuth: userId=" + userId + ", username=" + username + ", userType=" + userType +
                ", enabled=" + enabled + "\n";
    }
}
