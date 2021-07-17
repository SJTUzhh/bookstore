package com.reins.bookstore.serviceimpl;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findBookById(id);
    }

    @Override
    public List<Book> getBooksOnShelve() {
        return bookDao.getBooksOnShelve();
    }

    @Override
    public List<Book> getBooksIgnoreShelve() {
        return bookDao.getBooksIgnoreShelve();
    }

    @Override
    public List<Book> getBooksOnShelveBySearchName(String searchName) {
        return bookDao.getBooksOnShelveBySearchName(searchName);
    }

    @Override
    public void deleteBook(Integer bookId) {
        bookDao.deleteBook(bookId);
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
    public boolean commitBook(Book book) {
        return bookDao.commitBook(book);
    }
}
