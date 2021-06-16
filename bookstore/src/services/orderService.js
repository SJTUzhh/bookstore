import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const getOrderInfos = (data, callback) => {
    const url = `${config.apiUrl}/getOrderInfos`;
    postRequest(url, data, callback);

}