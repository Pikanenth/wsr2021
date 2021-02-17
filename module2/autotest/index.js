import { register, login, station, dispatch, booking, seat, profile } from './methods/index.js';

(async () => {
    // Регистрация
    await register.successful();
    await register.clean();
    await register.phone();
    // Авторизация
    await login.successful();
    await login.clean();
    await login.unauthorized();
    // Станции
    await station.successful();
    await station.noresults();
    // Рейсы
    await dispatch.successful();
    await dispatch.clean();
    await dispatch.validateId();
    await dispatch.validateDate();
    await dispatch.validatePassengers();
    // Бронирование
    await booking.successful();
    await booking.clean();
    await booking.validate();
    await booking.managment();
    // Места
    await seat.place_success();
    await seat.get();
    await seat.occupied();
    await seat.forbidden();
    await seat.clean();
    // Профиль
    await profile.unauthorized();
    await profile.success();
    await profile.booking();
})();