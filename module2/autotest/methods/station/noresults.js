import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Список станций. A7E2 No results. Correct body
// Список станций. A7E1 No results. Correct status
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/station?query=123xore`);

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

    if(data.status == 200) log.success('Список станций. A7E1 No results. Correct status');
    else log.error('Список станций. A7E1 No results. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.items': 'required|array',
        });

        if(!data.response.data.items[0]) log.success('Список станций. A7E2 No results. Correct body');
        else log.error('Список станций. A7E2 No results. Correct body');

    } catch (e) {
        log.error('Список станций. A7E2 No results. Correct body');
    }
};