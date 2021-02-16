import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Аутентификация. A2S1 Successful. Correct body
// Аутентификация. A2S2 Successful. Correct status
export default async () => {

    const { url, profile: { phone, password } } = config;

    let data;

    try {

        let response = await axios.post(`${ url }/login`, {
            phone, password
        });

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

    if(data.type !== 'application/json') {
        log.error('Данные принимаются не в json, выхожу........., Смотрим ручками');
        process.exit(0);
    }

    if(data.status == 200) log.success('Аутентификация. A2S2 Successful. Correct status');
    else log.error('Аутентификация. A2S2 Successful. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.token': 'required',
        });

        config.auth.token = data.response.data.token;

        log.success('Аутентификация. A2S1 Successful. Correct body');

    } catch (e) {
        log.error('Аутентификация. A2S1 Successful. Correct body');
    }
};