package com.reins.bookstore.service;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;

import java.util.List;


public interface BookService {

    Book findBookById(Integer id);

    List<Book> getBooksOnShelve();

    List<Book> getBooksIgnoreShelve();

    boolean commitBook(Book book);

    void deleteBook(Integer bookId);

    Book addBook();

    Boolean changeBookShelve(Integer bookId, Boolean shelve);

    List<Book> getBooksOnShelveBySearchName(String searchName);
}
