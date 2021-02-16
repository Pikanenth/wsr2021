import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Получение своих бронирований. A16E1 Unauthorized. Correct status
// Получение своих бронирований. A16E2 Unauthorized. Correct body

// Получение информации о пользователе. A13E1 Success. Correct status
// Получение информации о пользователе. A13E2 Success. Correct body
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/user`);

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

    if(data.status == 401) {
        log.success('Получение своих бронирований. A16E1 Unauthorized. Correct status');
        log.success('Получение информации о пользователе. A13E1 Success. Correct status');
    } else {
        log.error('Получение своих бронирований. A16E1 Unauthorized. Correct status');
        log.error('Получение информации о пользователе. A13E1 Success. Correct status');
    }

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:401,401',
            'error.message': 'required|in:Unauthorized',
        });

        log.success('Получение своих бронирований. A16E2 Unauthorized. Correct body');
        log.success('Получение информации о пользователе. A13E2 Success. Correct body');

    } catch (e) {
        log.error('Получение своих бронирований. A16E2 Unauthorized. Correct body');
        log.error('Получение информации о пользователе. A13E2 Success. Correct body');
    }
};