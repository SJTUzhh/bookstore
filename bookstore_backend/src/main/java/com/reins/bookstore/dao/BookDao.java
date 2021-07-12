package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;

import java.util.List;

public interface BookDao {
    Book findOne(Integer id);

    List<Book> getBooks();

    Msg commitBook(JSONObject bookParams);

    Msg deleteBook(Integer bookId);

    Book addBook();

    Boolean changeBookShelve(Integer bookId, Boolean shelve);

    List<Book> getBooksBySearchName(String searchName);
}
