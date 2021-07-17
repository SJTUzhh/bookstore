import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";


export const customerGetBooks = (data, callback) => {
    const url = `${config.apiUrl}/customerGetBooks`;
    postRequest(url, data, callback);
};

export const adminGetBooks = (data, callback) => {
    const url = `${config.apiUrl}/adminGetBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);

};

export const commitBook = (data, callback) => {
    const url = `${config.apiUrl}/commitBook`;
    postRequest_v2(url, data, callback);
}

export const deleteBook = (bookId, callback) => {
    const url = `${config.apiUrl}/deleteBook`;
    const data = {bookId: bookId};
    postRequest_v2(url, data, callback);
}

//在数据库中addBook，返回数据库中add的书
export const addBook = (callback) => {
    const url = `${config.apiUrl}/addBook`;
    postRequest_v2(url, {}, callback);
}

export const changeBookShelve = (data, callback) => {
    const url = `${config.apiUrl}/changeBookShelve`;
    postRequest_v2(url, data, callback);
}