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
@Table(name = "book")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")
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
    private Integer inventory;
    private String image;

    public Book(){
        this.isbn = "0";
        this.name = "default";
        this.author = "default";
        this.image = "default";
        this.inventory = 0;
    }

//    public Book(Integer bookId, String isbn, String name, String author, String image, Integer inventory){
//        this.bookId = bookId;
//        this.isbn = isbn;
//        this.name = name;
//        this.author = author;
//        this.image = image;
//        this.inventory = inventory;
//    }

}
