package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;

import java.util.List;

public interface BookDao {
    Book findBookById(Integer id);

    List<Book> getBooksOnShelve();

    List<Book> getBooksIgnoreShelve();

    List<Book> getBooksOnShelveBySearchName(String searchName);

    boolean commitBook(Book book);

    void deleteBook(Integer bookId);

    Book addBook();

    Boolean changeBookShelve(Integer bookId, Boolean shelve);
}
