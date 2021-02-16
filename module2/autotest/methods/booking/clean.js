import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Оформление бронирования. A10E2 Validation error. Correct body
// Оформление бронирования. A10E1 Validation error. Correct status
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.post(`${ url }/booking`);

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

    if(data.status == 422) log.success('Оформление бронирования. A10E1 Validation error. Correct status');
    else log.error('Оформление бронирования. A10E1 Validation error. Correct status');

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            'error.errors.dispatch_from.id': 'required|array',
            'error.errors.dispatch_from.date': 'required|array',
            'error.errors.passengers': 'required|array',
        });

        log.success('Оформление бронирования. A10E2 Validation error. Correct body');

    } catch (e) {
        log.error('Оформление бронирования. A10E2 Validation error. Correct body');
    }
};