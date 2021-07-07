package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

/**
 * @ClassName User
 * @Description Entity of User
 * @Author thunderBoy
 * @Date 2019/11/7 12:46
 */
@Data
@Entity
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {

    @Id
    private int userId;
    private String email;
    private String name;
    private String tel;
    private String address;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    UserAuth userAuth;

    public User(){}

    public User(String name, String email){
        this.name = name;
        this.email = email;
    }
}
