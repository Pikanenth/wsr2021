import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Аутентификация. A2E2 Validation error. Correct status
// Аутентификация. A2E1 Validation error. Correct body
export default async () => {

    const { url } = config;

    let data;

    try {
        let response = await axios.post(`${ url }/login`);
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

    if(data.status == 422) log.success('Аутентификация. A2E2 Validation error. Correct status');
    else log.error('Аутентификация. A2E2 Validation error. Correct status');

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            'error.errors.phone': 'required|array',
            'error.errors.password': 'required|array',
        });

        log.success('Аутентификация. A2E1 Validation error. Correct body');

    } catch (e) {
        log.error('Аутентификация. A2E1 Validation error. Correct body');
    }
};