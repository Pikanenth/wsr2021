export default {
    url: 'http://xjssjipu-m1.wsr.ru/api',
    profile: {
        phone: `${ getRandomInt(80000000000, 89999999999) }`,
        password: 'mysecretpassword',
        document_number: '7788223311',
        first_name: 'Валерий',
        last_name: 'Жмышенко',
    },
    auth: {
        token: null,
    },
    booking: {
        code: 'V3O2M',
        passenger_id: 1,
        left_code: 'FINJ6',
        place: getRandomInt(1,9) + 'A'
    }
};

// Number Generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}