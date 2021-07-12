package com.reins.bookstore.controller;
import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BookController
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/6 16:07
 */
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {
        String searchName = params.get("searchName");
        if(searchName !=null && searchName != ""){
            return bookService.getBooksBySearchName(searchName);
        }
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        return bookService.findBookById(id);
    }

    @RequestMapping("/commitBook")
    public Msg commitBook(@RequestParam(Constant.BOOK_ID) Integer bookId, @RequestParam(Constant.ISBN) String isbn,
                          @RequestParam(Constant.NAME) String name, @RequestParam(Constant.AUTHOR) String author,
                          @RequestParam(Constant.IMAGE) String image, @RequestParam(Constant.INVENTORY) Integer inventory){
        JSONObject bookParams = new JSONObject();
        bookParams.put(Constant.BOOK_ID, bookId);
        bookParams.put(Constant.ISBN, isbn);
        bookParams.put(Constant.NAME, name);
        bookParams.put(Constant.AUTHOR, author);
        bookParams.put(Constant.IMAGE, image);
        bookParams.put(Constant.INVENTORY, inventory);

        return bookService.commitBook(bookParams);
    }

    @RequestMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("bookId") Integer bookId){
        return bookService.deleteBook(bookId);
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
