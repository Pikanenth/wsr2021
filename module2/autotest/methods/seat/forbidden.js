import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Выбор места в вагоне. A15E4 Forbidden. Correct body
// Выбор места в вагоне. A15E3 Forbidden. Correct status
export default async () => {

    const { url, booking: { code } } = config;

    let data;

    try {

        let response = await axios.patch(`${ url }/booking/${ code }/seat`, {
            "passenger": 1,
            "seat": "3D",
            "type": "back"
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

    if(data.status == 403) log.success('Выбор места в вагоне. A15E3 Forbidden. Correct status');
    else log.error('Выбор места в вагоне. A15E3 Forbidden. Correct status');

    try {

        await validate(data.response, {
            'error': 'required',
            'error.code': 'required|range:403,403',
            'error.message': 'required'
        });

        log.success('Выбор места в вагоне. A15E4 Forbidden. Correct body');

    } catch (e) {
        log.error('Выбор места в вагоне. A15E4 Forbidden. Correct body');
    }
};