package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

/**
 * @ClassName UserAuth
 * @Description Entity of UserAuth
 * @Author thunderBoy
 * @Date 2019/11/7 13:07
 */

@Entity
@Data // 新加的字段要写getter和setter或者在类前面注解一个@Data，不然不会和数据库的字段关联起来
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class UserAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String name;

    //@Transient?
    private String password;
    private Integer userType;
    private Integer enabled;

    @OneToOne(mappedBy = "userAuth", cascade = {CascadeType.ALL}, optional = false, fetch = FetchType.LAZY)
    private User user;

    public UserAuth(){}

    public UserAuth(String name, String password, Integer userType, Integer enabled){
        this.name = name;
        this.password = password;
        this.userType = userType;
        this.enabled = enabled;
    }

    public UserAuth(Integer userId, String name, Integer enabled){
        this.userId = userId;
        this.name = name;
        this.enabled = enabled;
    }

    public String toString(){
        return "UserAuth: userId=" + userId + ", username=" + name + ", userType=" + userType +
                ", enabled=" + enabled + "\n";
    }


//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public Integer getUserType() {
//        return userType;
//    }
//
//    public void setUserType(Integer userType) {
//        this.userType = userType;
//    }
//
//    public Integer getEnabled() {
//        return enabled;
//    }
//
//    public void setEnabled(Integer enabled) {
//        this.enabled = enabled;
//    }

}
