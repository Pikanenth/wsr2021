import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Получение занятых мест в самолете. A14S2 Correct body
// Получение занятых мест в самолете. A14S1 Correct status
export default async () => {

    const { url, booking: { code } } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/booking/${ code }/seat`);

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

    if(data.status == 200) log.success('Получение занятых мест в самолете. A14S1 Correct status');
    else log.error('Получение занятых мест в самолете. A14S1 Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.occupied_from': 'required|array',
            'data.occupied_back': 'required|array',
            'data.occupied_back.0': 'required',
            'data.occupied_back.*.passenger_id': 'required',
            'data.occupied_back.*.place': 'required',
        });

        log.success('Получение занятых мест в самолете. A14S2 Correct body');

    } catch (e) {
        log.error('Получение занятых мест в самолете. A14S2 Correct body');
    }
};