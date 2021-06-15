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

/**
 * @ClassName BookDaoImpl
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/5 20:20
 */
@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findOne(Integer id){
        return bookRepository.getOne(id);
    }


    @Override
    public List<Book> getBooks() {
        return bookRepository.getBooks();
    }

    @Override
    public Msg commitBook(JSONObject bookParams) {
        Integer bookId = Integer.parseInt(bookParams.get(Constant.BOOK_ID).toString());
        boolean exist = bookRepository.existsById(bookId);
        if(exist){
            Book book = bookRepository.getOne(bookId);
            book.setIsbn(bookParams.get(Constant.ISBN).toString());
            book.setName(bookParams.get(Constant.NAME).toString());
            book.setAuthor(bookParams.get(Constant.AUTHOR).toString());
            book.setImage(bookParams.get(Constant.IMAGE).toString());
            book.setInventory(Integer.parseInt(bookParams.get(Constant.INVENTORY).toString()));
            bookRepository.save(book);
            bookRepository.flush();
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "保存成功（bookId：" + bookId + ")");
        }else{
            return MsgUtil.makeMsg(MsgCode.ERROR, "数据库不存在（bookId：" + bookId + ")");
        }



    }

    @Override
    public Msg deleteBook(Integer bookId) {
        bookRepository.deleteById(bookId);
        bookRepository.flush();
        return MsgUtil.makeMsg(MsgCode.SUCCESS, "删除成功（bookId：" + bookId + ")");
    }

    @Override
    public Book addBook() {
        Book newBook = new Book();
        bookRepository.save(newBook);
        bookRepository.flush();
        return newBook;
    }

}
