import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Получение своих бронирований. A16S1 Success. Correct status
// Получение своих бронирований. A16S2 Success. Correct body
export default async () => {

    const { url, auth: { token } } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/user/booking`, {
            headers: {
                authorization: 'Bearer ' + token
            }
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

    if(data.status == 200) log.success('Получение своих бронирований. A16S1 Success. Correct status');
    else log.error('Получение своих бронирований. A16S1 Success. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.items': 'required|array',
            'data.items.0': 'required',
            'data.items.*.code': 'required',
            'data.items.*.cost': 'required',
            'data.items.*.dispatches': 'required|array',
            'data.items.*.dispatches.0': 'required',
            'data.items.*.dispatches.*.dispatch_id': 'required',
            'data.items.*.dispatches.*.dispatch_code': 'required',
            'data.items.*.dispatches.*.from.city': 'required',
            'data.items.*.dispatches.*.from.station': 'required',
            'data.items.*.dispatches.*.from.station_id': 'required',
            'data.items.*.dispatches.*.from.date': 'required',
            'data.items.*.dispatches.*.from.time': 'required',
            'data.items.*.dispatches.*.to.city': 'required',
            'data.items.*.dispatches.*.to.station': 'required',
            'data.items.*.dispatches.*.to.station_id': 'required',
            'data.items.*.dispatches.*.to.date': 'required',
            'data.items.*.dispatches.*.to.time': 'required',
            'data.items.*.dispatches.*.cost': 'required',
            'data.items.*.dispatches.*.passengers': 'required|array',
            'data.items.*.dispatches.*.passengers.0': 'required',
            'data.items.*.dispatches.*.passengers.*.id': 'required',
            'data.items.*.dispatches.*.passengers.*.first_name': 'required',
            'data.items.*.dispatches.*.passengers.*.last_name': 'required',
            'data.items.*.dispatches.*.passengers.*.birth_date': 'required',
            'data.items.*.dispatches.*.passengers.*.document_number': 'required',
        });

        log.success('Получение своих бронирований. A16S2 Success. Correct body');

    } catch (e) {
        log.error('Получение своих бронирований. A16S2 Success. Correct body');
    }
};