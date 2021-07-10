package com.reins.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.Lombok;


import javax.persistence.*;

/**
 * @ClassName Book
 * @Description Book Entity
 * @Author thunderBoy
 * @Date 2019/11/5 19:19
 */
@Data
@Entity
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "bookId")
public class Book {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private int bookId;

    private String isbn;
    private String name;
    private String type;
    private String author;
    private Double price;
    private String description;
    private Integer inventory = 0;
    private String image;
    private Boolean shelve = true; //是否上架

    public Book(){}

}
