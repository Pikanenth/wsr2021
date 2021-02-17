import axios from 'axios';
import cheerio from 'cheerio';
import log from 'consola';
import config from './config.js';

(async() => {
    for(let i in config.pages) {
        log.info('Проверка страницы', i);
        console.log('');
        try {
            const {data} = await axios.get(`${ config.url }/${ i }`);
            const $ = await cheerio.load(data);

            log.info('Проверка заданий, с одним элементом');
            (config.pages[i].only).forEach(task => {
                log.info('Задание - ', task.name);
                (task.check).forEach(element => {
                    let el = $(element).html();
                    if(el === null) log.error(task.name, element, 'не найден');
                    else log.success(task.name, element, 'найден');
                });
            });

            log.info('Проверка заданий, с множеством элементов');
            (config.pages[i].all).forEach(task => {
                var length = $(task.check[0]).length;
                if(!length) log.error(task.name, 'Не найден начальный элемент', task.check[0]);
                else (task.check).forEach(element => {
                    let el = $(element);
                    if(el.length != length) log.error(task.name, 'Не совпадает количество элементов', element, el.length);
                    else log.success(task.name, 'Совпадает количество элементов', element, el.length);
                });
            });

        } catch (e) {
            log.error('Ошибка загрузки страницы', i, e);
        }
    }
})();