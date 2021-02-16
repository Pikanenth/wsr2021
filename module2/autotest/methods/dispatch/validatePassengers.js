import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Поиск поездок. A8E4 Validation error. Correct body
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/dispatch?passengers=766`);

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

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            'error.errors.passengers': 'required|array',
        });

        log.success('Поиск поездок. A8E4 Validation error. Correct body');

    } catch (e) {
        log.error('Поиск поездок. A8E4 Validation error. Correct body');
    }
};