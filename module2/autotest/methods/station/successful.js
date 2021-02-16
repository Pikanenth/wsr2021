import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Список станций. A7S1 Successful. Correct items
// Список станций. A7S2 Successful. Correct items
// Список станций. A7S3 Successful. Correct items
// Список станций. A7S4 Successful. Correct status
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/station?query=Kurgan`);

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

    if(data.status == 200) log.success('Список станций. A7S4 Successful. Correct status');
    else log.error('Список станций. A7S4 Successful. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.items': 'required|array',
            'data.items.0': 'required',
            'data.items.0.id': 'required|range:2,2',
            'data.items.0.name': 'required|in:Kurgan',
        });

        log.success('Список станций. A7S1 Successful. Correct items');
        log.success('Список станций. A7S2 Successful. Correct items');
        log.success('Список станций. A7S3 Successful. Correct items');

    } catch (e) {
        log.error('Список станций. A7S1 Successful. Correct items');
        log.error('Список станций. A7S2 Successful. Correct items');
        log.error('Список станций. A7S3 Successful. Correct items');
    }
};