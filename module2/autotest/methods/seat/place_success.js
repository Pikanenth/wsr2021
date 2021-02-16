import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Выбор места в вагоне. A15S1 Success. Correct body
// Выбор места в вагоне. A15S1 Success. Correct status
export default async () => {

    const { url, booking: { code, passenger_id, place } } = config;

    let data;

    try {

        let response = await axios.patch(`${ url }/booking/${ code }/seat`, {
            "passenger": passenger_id,
            "seat": place,
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

    if(data.status == 200) log.success('Выбор места в вагоне. A15S1 Success. Correct status');
    else log.error('Выбор места в вагоне. A15S1 Success. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.id': 'required',
            'data.first_name': 'required',
            'data.last_name': 'required',
            'data.birth_date': 'required',
            'data.document_number': 'required',
            'data.place_back': 'required|in:' + place,
        });

        log.success('Выбор места в вагоне. A15S1 Success. Correct body');

    } catch (e) {
        log.error('Выбор места в вагоне. A15S1 Success. Correct body');
    }
};