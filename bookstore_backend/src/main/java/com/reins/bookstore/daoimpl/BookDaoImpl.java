package com.reins.bookstore.daoimpl;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findBookById(Integer id){
        return bookRepository.findBookByIdOnShelve(id);
    }


    @Override
    public List<Book> getBooksOnShelve() {
        return bookRepository.getBooksOnShelve();
    }

    @Override
    public List<Book> getBooksIgnoreShelve() {
        return bookRepository.getBooksIgnoreShelve();
    }


    @Override
    public List<Book> getBooksOnShelveBySearchName(String searchName) {
        return bookRepository.findBooksByNameContainsAndShelve(searchName, true);
    }

    @Override
    public boolean commitBook(Book book) {
        Integer bookId = book.getBookId();
        boolean exist = bookRepository.existsById(bookId);
        if(!exist) return false;
        Book oldBook = bookRepository.getOne(bookId);
        oldBook.setIsbn(book.getIsbn());
        oldBook.setName(book.getName());
        oldBook.setAuthor(book.getAuthor());
        oldBook.setImage(book.getImage());
        oldBook.setInventory(book.getInventory());
        bookRepository.saveAndFlush(oldBook);
        return true;
    }

    @Override
    public void deleteBook(Integer bookId) {
        bookRepository.deleteById(bookId);
        bookRepository.flush();
    }

    @Override
    public Book addBook() {
        Book newBook = new Book();
        bookRepository.saveAndFlush(newBook);
        return newBook;
    }

    @Override
    public Boolean changeBookShelve(Integer bookId, Boolean shelve) {
        Book book = bookRepository.getOne(bookId);
        book.setShelve(shelve);
        bookRepository.saveAndFlush(book);
        return shelve;
    }
}
