export default {
    url: 'http://dzygkihn-m1.wsr.ru/',
    pages: {
        // Страница обращения
        'index.html': {
            // Только одного
            only: [
                {
                    name: 'Шапка сайта:',
                    check: ['.test-0-logo', '.test-0-nav-1', '.test-0-nav-2', '.test-0-nav-3', '.test-0-nav-4']
                },
                {
                    name: 'Форма поиска:',
                    check: ['.test-0-fd', '.test-0-fa', '.test-0-fdt-', '.test-0-fat', '.test-0-fnp', '.test-0-fbs']
                },
                {
                    name: 'Форма поиска на закрытые акции:',
                    check: ['.test-0-sie', '.test-0-sbs']
                },
                {
                    name: 'Подвал сайта:',
                    check: ['.test-0-phone']
                },
            ],
            // Для проверки каждого
            all: [
                {
                    name: 'Акции:',
                    check: ['.test-0-ai', '.test-0-an', '.test-0-ad', '.test-0-abm']
                },
            ]
        },
        'search.html': {
            // Только одного
            only: [],
            // Для проверки каждого
            all: [
                {
                    name: 'Страница с результатами поиска:',
                    check: ['.test-4-fn', '.test-4-dd', '.test-4-dt', '.test-4-ft', '.test-4-fp', '.test-4-fh']
                },
                {
                    name: 'Страница с результатами поиска:',
                    check: ['.test-4-at']
                },
            ]
        },
        'booking.html': {
            // Только одного
            only: [
                {
                    name: 'Кнопка для добавления еще одного пассажира:',
                    check: ['.test-5-add']
                },
                {
                    name: 'Кнопка для удаления пассажира:',
                    check: ['.test-5-remove']
                },
                {
                    name: 'Финальная стоимость:',
                    check: ['.test-5-price']
                },
                {
                    name: 'Кнопка для оформления бронирования:',
                    check: ['.test-5-book']
                },
            ],
            // Для проверки каждого
            all: [
                {
                    name: 'Данные о маршрутах:',
                    check: ['.test-5-fc', '.test-5-fcity', '.test-5-from', '.test-5-dd', '.test-5-dt', '.test-5-tcity', '.test-5-to', '.test-5-at', '.test-5-fp']
                },
                {
                    name: 'Данные о пассажирах:',
                    check: ['.test-5-name', '.test-5-last', '.test-5-dob', '.test-5-doc']
                },
            ]
        },
        'booking_management.html': {
            // Только одного
            only: [
                {
                    name: 'Информация о бронировании:',
                    check: ['.test-6-code', '.test-6-tp']
                },
                {
                    name: 'Кнопка для выбора места:',
                    check: ['.test-6-select']
                },
            ],
            // Для проверки каждого
            all: [
                {
                    name: 'Информация об отправлении:',
                    check: ['.test-6-fc', '.test-6-ac', '.test-6-fcity', '.test-6-from', '.test-6-dd', '.test-6-dt', '.test-6-tcity', '.test-6-to', '.test-6-at', '.test-6-ft', '.test-6-ft', '.test-6-fh']
                },
                {
                    name: 'Информация о пассажирах:',
                    check: ['.test-6-name', '.test-6-last', '.test-6-dob', '.test-6-doc', '.test-6-ts', '.test-6-bs']
                },
            ]
        },
        'register.html': {
            // Только одного
            only: [
                {
                    name: 'Регистрация в личном кабинете:',
                    check: ['.test-2-name', '.test-2-last', '.test-2-doc', '.test-2-phone', '.test-2-pass', '.test-2-pass2', '.test-2-btn']
                },
            ],
            // Для проверки каждого
            all: [
            ]
        },
        'login.html': {
            // Только одного
            only: [
                {
                    name: 'Страница входа в личный кабинет:',
                    check: ['.test-1-fpn', '.test-1-fps', '.test-1-fbs']
                },
            ],
            // Для проверки каждого
            all: [
            ]
        },
        'profile.html': {
            // Только одного
            only: [
                {
                    name: 'Страница личного кабинета:',
                    check: ['.test-3-name', '.test-3-last', '.test-3-num', '.test-3-logout']
                },
            ],
            // Для проверки каждого
            all: [
                {
                    name: 'Страница личного кабинета:',
                    check: ['.test-3-code', '.test-3-d1', '.test-3-t1', '.test-3-t2', '.test-3-from', '.test-3-to']
                },
            ]
        },
    }
};