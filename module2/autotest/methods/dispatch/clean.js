import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Поиск поездок. A8E1 Validation error. Correct status
// Поиск поездок. A8E5 Validation error. Correct body
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/dispatch`);

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

    if(data.status == 422) log.success('Поиск поездок. A8E1 Validation error. Correct status');
    else log.error('Поиск поездок. A8E1 Validation error. Correct status');

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            'error.errors.from': 'required|array',
            'error.errors.to': 'required|array',
            'error.errors.date1': 'required|array',
            'error.errors.passengers': 'required|array',
        });

        log.success('Поиск поездок. A8E5 Validation error. Correct body');

    } catch (e) {
        log.error('Поиск поездок. A8E5 Validation error. Correct body');
    }
};