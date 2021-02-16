import axios from 'axios';
import config from "../../config.js";
import log from 'consola';

// Регистрация. A1S1 Successful. Correct status
export default async () => {

    const { url, profile } = config;

    let data;

    try {
        let response = await axios.post(`${ url }/register`, profile);
        data = {
            status: response.status,
            type: response.headers['content-type'],
            response: response.data
        };
    } catch (e) {
        data = {
            status: e.response.status,
            type: e.response.headers['content-type'],
            response: e.response.data
        };
    }

    if(data.status === 204) log.success('Регистрация. A1S1 Successful. Correct status');
    else log.error('Регистрация. A1S1 Successful. Correct status');

};