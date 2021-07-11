import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const adminGetOrderInfos = (data, callback) => {
    const url = `${config.apiUrl}/adminGetOrderInfos`;
    postRequest_v2(url, data, callback);

}

export const customerGetOrderInfos = (data, callback) => {
    const url = `${config.apiUrl}/customerGetOrderInfos`;
    postRequest_v2(url, data, callback);

}

export const customerGetBoughtBookInfos = (data, callback) => {
    const url = `${config.apiUrl}/customerGetBoughtBookInfos`;
    postRequest_v2(url, data, callback);

}


