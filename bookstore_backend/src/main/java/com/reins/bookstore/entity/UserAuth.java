package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;


@Entity
//@Data: 一对一双向映射中（User和UserAuth），必须有一个不能用@Data，因为必须有一个不能重写toString
//否则会堆栈溢出，User和UserAuth反复调用hashcode
//跟JSONObject.fromObject调用toString有关
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

    /* getters and setters */

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String username) {
        this.name = username;
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

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

}
