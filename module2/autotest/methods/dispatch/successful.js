import axios from 'axios';
import config from "../../config.js";
import log from 'consola';
import { validate } from 'indicative/validator.js'

// Поиск поездок. A8S2 Successful. Correct body
// Поиск поездок. A8S1 Successful. Correct status
export default async () => {

    const { url } = config;

    let data;

    try {

        let response = await axios.get(`${ url }/dispatch?from=1&to=2&date1=2020-10-01&date2=2020-10-10&passengers=1`);

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

    if(data.status == 200) log.success('Поиск поездок. A8S1 Successful. Correct status');
    else log.error('Поиск поездок. A8S1 Successful. Correct status');

    try {

        await validate(data.response, {
            'data': 'required',

            'data.dispatch_to': 'required|array',
            'data.dispatch_to.0': 'required',
            'data.dispatch_to.0.dispatch_id': 'required',
            'data.dispatch_to.0.dispatch_code': 'required',
            'data.dispatch_to.0.from.city': 'required',
            'data.dispatch_to.0.from.station': 'required',
            'data.dispatch_to.0.from.station_id': 'required',
            'data.dispatch_to.0.from.date': 'required',
            'data.dispatch_to.0.from.time': 'required',
            'data.dispatch_to.0.to.city': 'required',
            'data.dispatch_to.0.to.station': 'required',
            'data.dispatch_to.0.to.station_id': 'required',
            'data.dispatch_to.0.to.date': 'required',
            'data.dispatch_to.0.to.time': 'required',
            'data.dispatch_to.0.cost': 'required',

            'data.dispatches_back': 'required|array',
            'data.dispatches_back.0': 'required',
            'data.dispatches_back.0.dispatch_id': 'required',
            'data.dispatches_back.0.dispatch_code': 'required',
            'data.dispatches_back.0.from.city': 'required',
            'data.dispatches_back.0.from.station': 'required',
            'data.dispatches_back.0.from.station_id': 'required',
            'data.dispatches_back.0.from.date': 'required',
            'data.dispatches_back.0.from.time': 'required',
            'data.dispatches_back.0.to.city': 'required',
            'data.dispatches_back.0.to.station': 'required',
            'data.dispatches_back.0.to.station_id': 'required',
            'data.dispatches_back.0.to.date': 'required',
            'data.dispatches_back.0.to.time': 'required',
            'data.dispatches_back.0.cost': 'required',
        });

        log.success('Поиск поездок. A8S2 Successful. Correct body');

    } catch (e) {
        log.error('Поиск поездок. A8S2 Successful. Correct body');
    }
};