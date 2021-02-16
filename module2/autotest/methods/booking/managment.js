import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Информация о бронировании. A11S1 Correct status
// Информация о бронировании. A11S2 Correct body
export default async () => {

    const { url, booking: { code } } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/booking/${ code }`);

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

    if(data.status == 200) log.success('Информация о бронировании. A11S1 Correct status');
    else log.error('Информация о бронировании. A11S1 Correct status');

    try {

        await validate(data.response, {
            'data': 'required',
            'data.code': 'required',
            'data.cost': 'required',
            'data.dispatches': 'required|array',
            'data.dispatches.0': 'required',
            'data.dispatches.1': 'required',
            'data.dispatches.*.dispatch_id': 'required',
            'data.dispatches.*.dispatch_code': 'required',
            'data.dispatches.*.from.city': 'required',
            'data.dispatches.*.from.station': 'required',
            'data.dispatches.*.from.station_id': 'required',
            'data.dispatches.*.from.date': 'required',
            'data.dispatches.*.from.time': 'required',
            'data.dispatches.*.cost': 'required',

            'data.passengers': 'required|array',
            'data.passengers.0': 'required',
            'data.passengers.*.id': 'required',
            'data.passengers.*.first_name': 'required',
            'data.passengers.*.last_name': 'required',
            'data.passengers.*.birth_date': 'required',
            'data.passengers.*.document_number': 'required'
        });

        config.booking.passenger_id = data.response.data.passengers[0].id;

        log.success('Информация о бронировании. A11S2 Correct body');
        log.success('Информация о бронировании. A11S3 Correct body');

    } catch (e) {
        log.error('Информация о бронировании. A11S2 Correct body');
        log.error('Информация о бронировании. A11S3 Correct body');
    }
};