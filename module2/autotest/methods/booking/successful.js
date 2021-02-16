import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Оформление бронирования. A10S2 Successful. Correct body
// Оформление бронирования. A10S1 Successful. Correct status
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.post(`${ url }/booking`, {
            "dispatch_from": {
                "id": 1,
                "date": "2020-10-01"
            },
            "dispatch_back": {
                "id": 2,
                "date": "2020-10-10"
            },
            "passengers": [
                {
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "birth_date": "1990-02-20",
                    "document_number": "7788223311"
                },
                {
                    "first_name": "Анна",
                    "last_name": "Петрова",
                    "birth_date": "1992-09-22",
                    "document_number": "9922335577"
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

    if(data.status == 201) log.success('Оформление бронирования. A10S1 Successful. Correct status');
    else log.error('Оформление бронирования. A10S1 Successful. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.code': 'required'
        });

        config.booking.code = data.response.data.code;

        log.success('Оформление бронирования. A10S2 Successful. Correct body');

    } catch (e) {
        log.error('Оформление бронирования. A10S2 Successful. Correct body');
    }
};