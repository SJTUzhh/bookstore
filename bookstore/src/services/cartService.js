import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const addBook2Cart = (userId, bookId, addCount, callback) => {
    const url = `${config.apiUrl}/addBook2Cart`;
    const data = {userId: userId, bookId: bookId, addCount: addCount};
    postRequest_v2(url, data, callback)
}

export const deleteBookFromCart = (userId, bookId, callback) => {
    const url = `${config.apiUrl}/deleteBookFromCart`;
    const data = {userId: userId, bookId: bookId};
    postRequest_v2(url, data, callback)
}


export const getCartByUserId = (userId, callback) => {
    const url = `${config.apiUrl}/getCartByUserId`;
    const data = {userId: userId};
    postRequest_v2(url, data, callback)
}