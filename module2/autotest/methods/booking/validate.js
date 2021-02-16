import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Оформление бронирования. A10E3 Validation error. Correct body
// Оформление бронирования. A10E4 Validation error. Correct body
// Оформление бронирования. A10E5 Validation error. Correct body
// Оформление бронирования. A10E6 Validation error. Correct body
// Оформление бронирования. A10E7 Validation error. Correct body
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.post(`${ url }/booking`, {
            "dispatch_from": {
                "id": 321321321,
                "date": "321321321"
            },
            "dispatch_back": {
                "id": 321321,
                "date": "321321321"
            },
            "passengers": [
                {
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "birth_date": "321321321321321",
                    "document_number": "7788223311333"
                }
            ]
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

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:422,422',
            'error.message': 'required',
            'error.errors': 'required|object',
            "error.errors.dispatch_from.id": 'required|array',
            "error.errors.dispatch_from.date": 'required|array',
            "error.errors.dispatch_back.id": 'required|array',
            "error.errors.dispatch_back.date": 'required|array',
            "error.errors.passengers.*.document_number": 'required',
            "error.errors.passengers.*.birth_date": 'required',
        });

        log.success('Оформление бронирования. A10E3 Validation error. Correct body');
        log.success('Оформление бронирования. A10E4 Validation error. Correct body');
        log.success('Оформление бронирования. A10E5 Validation error. Correct body');
        log.success('Оформление бронирования. A10E6 Validation error. Correct body');
        log.success('Оформление бронирования. A10E7 Validation error. Correct body');

    } catch (e) {
        log.error('Оформление бронирования. A10E3 Validation error. Correct body');
        log.error('Оформление бронирования. A10E4 Validation error. Correct body');
        log.error('Оформление бронирования. A10E5 Validation error. Correct body');
        log.error('Оформление бронирования. A10E6 Validation error. Correct body');
        log.error('Оформление бронирования. A10E7 Validation error. Correct body');
    }
};