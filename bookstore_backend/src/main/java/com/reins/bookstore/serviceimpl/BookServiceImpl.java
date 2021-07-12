package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName BookServiceImpl
 * @Description the Implement of BookService
 * @Author thunderBoy
 * @Date 2019/11/6 16:04
 */

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Msg commitBook(JSONObject bookParams) {
        return bookDao.commitBook(bookParams);
    }

    @Override
    public Msg deleteBook(Integer bookId) {
        return bookDao.deleteBook(bookId);
    }

    @Override
    public Book addBook() {
        return bookDao.addBook();
    }

    @Override
    public Boolean changeBookShelve(Integer bookId, Boolean shelve) {
        return bookDao.changeBookShelve(bookId, shelve);
    }

    @Override
    public List<Book> getBooksBySearchName(String searchName) {
        return bookDao.getBooksBySearchName(searchName);
    }
}
