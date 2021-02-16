import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Получение информации о пользователе. A13S1 Success. Correct status
// Получение информации о пользователе. A13S2 Success. Correct body
export default async () => {

    const { url, auth: { token } } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/user`, {
            headers: {
                authorization: 'Bearer ' + token
            }
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

    if(data.status == 200) log.success('Получение информации о пользователе. A13S1 Success. Correct status');
    else log.error('Получение информации о пользователе. A13S1 Success. Correct status');

    try {

        await validate(data.response, {
            'first_name': 'required',
            'last_name': 'required',
            'phone': 'required',
            'document_number': 'required',
        });

        log.success('Получение информации о пользователе. A13S2 Success. Correct body');

    } catch (e) {
        log.error('Получение информации о пользователе. A13S2 Success. Correct body');
    }
};