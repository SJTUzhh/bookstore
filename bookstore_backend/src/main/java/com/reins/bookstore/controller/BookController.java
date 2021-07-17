package com.reins.bookstore.controller;
import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/customerGetBooks")
    public List<Book> customerGetBooks(@RequestBody Map<String, String> params) {
        String searchName = params.get("searchName");
        if(searchName != null && !searchName.equals("")){
            return bookService.getBooksOnShelveBySearchName(searchName);
        }
        return bookService.getBooksOnShelve();
    }

    @RequestMapping("/adminGetBooks")
    public List<Book> adminGetBooks(@RequestBody Map<String, String> params) {
        //管理员的搜索是在前端完成的，所以这里不过滤
        return bookService.getBooksIgnoreShelve();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        return bookService.findBookById(id);
    }

    @RequestMapping("/commitBook")
    public Msg commitBook(Book book){
         boolean status = bookService.commitBook(book);
         if(status) return MsgUtil.makeMsg(MsgCode.SUCCESS, "保存成功（bookId：" + book.getBookId() + ")");
         else return MsgUtil.makeMsg(MsgCode.ERROR, "数据库不存在该书（bookId：" + book.getBookId() + ")");
    }

    @RequestMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("bookId") Integer bookId){
        bookService.deleteBook(bookId);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, "删除成功（bookId：" + bookId + ")");
    }

    @RequestMapping("/addBook")
    public Book addBook(){
        return bookService.addBook();
    }

    @RequestMapping("/changeBookShelve")
    public Boolean changeBookShelve(@RequestParam("bookId") Integer bookId, @RequestParam("shelve") Boolean shelve){
        return bookService.changeBookShelve(bookId, shelve);
    }
}
