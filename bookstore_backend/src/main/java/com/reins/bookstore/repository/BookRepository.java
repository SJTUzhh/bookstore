package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query("select b from Book b where b.bookId = :bookId and b.shelve = true")
    Book findBookByIdOnShelve(@Param("bookId") Integer bookId);

    @Query("select b from Book b where b.shelve = true")
    List<Book> getBooksOnShelve();

    @Query("select b from Book b")
    List<Book> getBooksIgnoreShelve();

    List<Book> findBooksByNameContainsAndShelve(String searchName, boolean shelve);
}
