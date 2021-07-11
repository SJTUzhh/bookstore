package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.Cart;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.repository.BookRepository;
import com.reins.bookstore.repository.CartRepository;
import com.reins.bookstore.repository.OrderRepository;
import net.sf.json.JSONObject;
import org.omg.CORBA.INTERNAL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.reins.bookstore.entity.compositePK.CartPK;

import javax.print.attribute.standard.JobSheets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Cart addBook2Cart(Integer userId, Integer bookId, Integer addCount){
        Cart cart;
        boolean exists = cartRepository.existsById(new CartPK(userId, bookId));
        //TODO: 目前还没有一次减超过1的case，所以暂时不用检查减少到小于0的情况
        if(exists){
            cart = cartRepository.getOne(new CartPK(userId, bookId));
            cart.setCount(cart.getCount() + addCount);
        } else{
            //存在减的case，特殊处理
            addCount = addCount > 0 ? addCount : 0;
            cart  = new Cart(userId, bookId, addCount);
        }
        cartRepository.saveAndFlush(cart);
        return new Cart(userId, bookId, addCount);
    }

    @Override
    public List<JSONObject> getCartByUserId(Integer userId){
        List<Integer> bookIds = new ArrayList<>();
        List<JSONObject> cartInfos = new ArrayList<>();
        cartRepository.findByUserId(userId).forEach((cart)->{
            JSONObject cartInfo = new JSONObject();
            cartInfo.put("bookId", cart.getBookId());
            cartInfo.put("count", cart.getCount());
            cartInfos.add(cartInfo);
            bookIds.add(cart.getBookId());
        });
        List<Book> booksInCart = bookRepository.findAllById(bookIds);
        if(booksInCart.size() != cartInfos.size()){
            System.out.println("-------------------------------wrong case------------------------------------------");
        }
        for(int i = 0; i < cartInfos.size(); i++){
            cartInfos.get(i).put("bookName", booksInCart.get(i).getName());
            cartInfos.get(i).put("price", booksInCart.get(i).getPrice());
            cartInfos.get(i).put("shelve", booksInCart.get(i).getShelve());
        }
        return cartInfos;
    }

    @Override
    public Cart deleteBookFromCart(Integer userId, Integer bookId) {
        cartRepository.deleteById(new CartPK(userId, bookId));
        return new Cart(userId, bookId, 0);
    }

    @Override
    public List<JSONObject> payByCart(Integer userId, List<Integer> bookIds) {
        List<Book> books = bookRepository.findAllById(bookIds);
        List<Cart> carts = cartRepository.findAllByUserIdAndBookIdIn(userId, bookIds);
        List<JSONObject> payResults = new ArrayList<>();
        Order order = new Order(LocalDateTime.now(), userId);

        if(books.size() != carts.size())
            System.out.println("---------------------------------wrong case----------------------");

        for(int i = 0; i < books.size(); i++){
            Book book = books.get(i);
            Cart cart = carts.get(i);
            JSONObject payResult = new JSONObject();
            payResult.put("bookName", book.getName());
            payResult.put("price", book.getPrice());
            payResult.put("count", cart.getCount());
            payResult.put("cost", book.getPrice() * cart.getCount());
            payResult.put("inventory", book.getInventory());
            payResult.put("shelve", book.getShelve());

            int countInCart = cart.getCount();
            int inventory = book.getInventory();
            if(!book.getShelve()){
                payResult.put("state", "fail");
                payResult.put("message", "该书已下架");
            }else if(countInCart > inventory){
                payResult.put("state", "fail");
                payResult.put("message", "库存不足，仅剩" + inventory + "件");
            }else{
                book.setInventory(inventory-countInCart);
                bookRepository.saveAndFlush(book);
                cartRepository.delete(cart);
                cartRepository.flush();
                payResult.put("state", "success");
                payResult.put("message", "购买成功");

                //生成订单
                OrderItem orderItem = new OrderItem(book.getBookId(), book.getName(), cart.getCount(), book.getPrice() * cart.getCount());
                order.getOrderItems().add(orderItem);
                orderItem.setOrder(order);
            }

            orderRepository.saveAndFlush(order);
            payResults.add(payResult);
        }
        return payResults;
    }

}
