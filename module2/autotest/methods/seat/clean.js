import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Выбор места в вагоне. A15E6 Validation error. Correct body
// Выбор места в вагоне. A15E5 Validation error. Correct status
export default async () => {

    const { url, booking: { code } } = config;

    let data;

    try {

        let response = await axios.patch(`${ url }/booking/${ code }/seat`);

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

    if(data.status == 422) log.success('Выбор места в вагоне. A15E5 Validation error. Correct status');
    else log.error('Выбор места в вагоне. A15E5 Validation error. Correct status');

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            'error.errors.passenger': 'required|array',
            'error.errors.seat': 'required|array',
            'error.errors.type': 'required|array',
        });

        log.success('Выбор места в вагоне. A15E6 Validation error. Correct body');

    } catch (e) {
        log.error('Выбор места в вагоне. A15E6 Validation error. Correct body');
    }
};