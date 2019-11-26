import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi(endpoint, method = 'GET', body, header){
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body,
        headers: header
        //header: header
    }).catch(err => {
        console.log(err);
    });
};