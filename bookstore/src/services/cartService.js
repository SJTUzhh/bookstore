import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const addBook2Cart = (userId, bookId, callback) => {
    const url = `${config.apiUrl}/addBook2Cart`;
    const data = {userId: userId, bookId: bookId};
    postRequest_v2(url, data, callback)
}